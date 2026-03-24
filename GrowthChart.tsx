import { faker } from '@faker-js/faker';

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
    reach: number;
  };
  audience: {
    cities: { name: string; value: number }[];
    gender: { name: string; value: number }[];
    ageGroups: { name: string; value: number }[];
  };
  growthHistory: { date: string; followers: number }[];
  recentPosts: { id: string; imageUrl: string; likes: number; comments: number }[];
}

const INDIAN_CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'];
const CATEGORIES = ['Fashion & Beauty', 'Travel', 'Food', 'Tech', 'Fitness', 'Lifestyle', 'Comedy & Entertainment'];

export const generateInfluencerData = (username: string): InfluencerData => {
  // Seed faker with the username so the same username always returns the same data
  faker.seed(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));

  const followers = faker.number.int({ min: 10000, max: 5000000 });
  const posts = faker.number.int({ min: 50, max: 3000 });
  const engagementRate = faker.number.float({ min: 1.5, max: 8.5 });
  
  const avgLikes = Math.floor(followers * (engagementRate / 100) * faker.number.float({ min: 0.8, max: 0.95 }));
  const avgComments = Math.floor(avgLikes * faker.number.float({ min: 0.01, max: 0.05 }));

  // Generate Growth History (Last 6 months)
  const growthHistory = [];
  let currentFollowers = followers;
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    growthHistory.push({
      date: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
      followers: Math.floor(currentFollowers)
    });
    // Reverse engineer past followers based on random growth
    currentFollowers = currentFollowers / (1 + faker.number.float({ min: 0.01, max: 0.05 }));
  }

  // Generate Audience Cities
  const shuffledCities = [...INDIAN_CITIES].sort(() => 0.5 - faker.number.float());
  const topCities = shuffledCities.slice(0, 5).map(city => ({
    name: city,
    value: faker.number.int({ min: 5, max: 35 })
  }));

  // Normalize city percentages
  const totalCityPct = topCities.reduce((acc, curr) => acc + curr.value, 0);
  topCities.forEach(city => city.value = Number(((city.value / totalCityPct) * 100).toFixed(1)));

  // Generate Recent Posts
  const recentPosts = Array.from({ length: 6 }).map((_, i) => ({
    id: faker.string.uuid(),
    imageUrl: `https://picsum.photos/seed/${username}${i}/400/400`,
    likes: Math.floor(avgLikes * faker.number.float({ min: 0.5, max: 1.5 })),
    comments: Math.floor(avgComments * faker.number.float({ min: 0.5, max: 1.5 }))
  }));

  return {
    username: username.toLowerCase().replace('@', ''),
    fullName: faker.person.fullName(),
    bio: faker.lorem.sentences(2),
    avatarUrl: `https://i.pravatar.cc/150?u=${username}`,
    isVerified: followers > 100000 || faker.datatype.boolean(),
    category: faker.helpers.arrayElement(CATEGORIES),
    stats: {
      followers,
      following: faker.number.int({ min: 50, max: 1000 }),
      posts,
      engagementRate,
      avgLikes,
      avgComments,
      reach: Math.floor(followers * faker.number.float({ min: 0.3, max: 0.7 }))
    },
    audience: {
      cities: topCities.sort((a, b) => b.value - a.value),
      gender: [
        { name: 'Male', value: faker.number.int({ min: 30, max: 70 }) },
        { name: 'Female', value: 0 } // Calculated below
      ].map((g, i, arr) => {
        if (i === 1) g.value = 100 - arr[0].value;
        return g;
      }),
      ageGroups: [
        { name: '13-17', value: faker.number.int({ min: 5, max: 15 }) },
        { name: '18-24', value: faker.number.int({ min: 25, max: 45 }) },
        { name: '25-34', value: faker.number.int({ min: 20, max: 40 }) },
        { name: '35-44', value: faker.number.int({ min: 5, max: 15 }) },
        { name: '45+', value: faker.number.int({ min: 1, max: 5 }) },
      ]
    },
    growthHistory,
    recentPosts
  };
};
