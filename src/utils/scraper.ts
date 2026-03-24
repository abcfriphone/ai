import { InfluencerData, ApifyProfile } from '../types';

export const scrapeInstagramProfile = async (username: string): Promise<InfluencerData> => {
  const cleanUsername = username.replace('@', '').trim();
  const apifyToken = import.meta.env.VITE_APIFY_API_TOKEN;

  if (!apifyToken || apifyToken === 'YOUR_API_KEY') {
    throw new Error('Apify API token is missing. Please configure VITE_APIFY_API_TOKEN in your .env file.');
  }

  console.log(`[Scraper] Initiating fetch for username: ${cleanUsername}`);

  const response = await fetch(
    `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${apifyToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernames: [cleanUsername],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Scraper] Raw Error Response:', errorText);
    throw new Error(`API Error (${response.status}): Failed to fetch data. Please check your API key and limits.`);
  }

  const datasetItems: ApifyProfile[] = await response.json();
  console.log('[Scraper] Raw API Response:', datasetItems);

  if (!datasetItems || datasetItems.length === 0) {
    throw new Error('No data returned. The profile might be private, invalid, or blocked by Instagram.');
  }

  const igData = datasetItems[0];

  // Calculate engagement from real recent posts
  let avgLikes = 0;
  let avgComments = 0;
  let engagementRate = 0;
  const recentPosts = igData.latestPosts?.slice(0, 6) || [];

  if (recentPosts.length > 0) {
    const totalLikes = recentPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0);
    const totalComments = recentPosts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);
    
    avgLikes = Math.round(totalLikes / recentPosts.length);
    avgComments = Math.round(totalComments / recentPosts.length);
    
    if (igData.followersCount > 0) {
      engagementRate = Number((((avgLikes + avgComments) / igData.followersCount) * 100).toFixed(2));
    }
  }

  return {
    username: igData.username,
    fullName: igData.fullName || igData.username,
    bio: igData.biography || '',
    avatarUrl: igData.profilePicUrlHD || '',
    isVerified: igData.isVerified || false,
    category: igData.businessCategoryName || 'Creator',
    stats: {
      followers: igData.followersCount || 0,
      following: igData.followsCount || 0,
      posts: igData.postsCount || 0,
      engagementRate,
      avgLikes,
      avgComments,
    },
    recentPosts: recentPosts.map(post => ({
      id: post.id,
      imageUrl: post.displayUrl,
      likes: post.likesCount || 0,
      comments: post.commentsCount || 0
    }))
  };
};
