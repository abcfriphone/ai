export interface ApifyPost {
  id: string;
  displayUrl: string;
  likesCount: number;
  commentsCount: number;
}

export interface ApifyProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrlHD: string;
  isVerified: boolean;
  businessCategoryName: string | null;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  latestPosts: ApifyPost[];
}

export interface InfluencerData {
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  category: string;
  stats: {
    followers: number;
    following: number;
    posts: number;
    engagementRate: number;
    avgLikes: number;
    avgComments: number;
  };
  recentPosts: { id: string; imageUrl: string; likes: number; comments: number }[];
}
