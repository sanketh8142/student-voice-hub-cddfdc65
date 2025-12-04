// Mock NoSQL Data Types & Store

export interface User {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  followers: string[];
  following: string[];
}

export interface Comment {
  _id: string;
  user_id: string;
  content: string;
  timestamp: Date;
}

export interface Post {
  _id: string;
  user_id: string;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  timestamp: Date;
  likes: string[];
  comments: Comment[];
}

// Sample Users Collection
export const initialUsers: User[] = [
  {
    _id: 'user_1',
    username: 'arjun_dev',
    fullname: 'Arjun Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    followers: ['user_2', 'user_3', 'user_4'],
    following: ['user_2', 'user_3'],
  },
  {
    _id: 'user_2',
    username: 'sneha_creates',
    fullname: 'Sneha Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    followers: ['user_1', 'user_3'],
    following: ['user_1', 'user_4'],
  },
  {
    _id: 'user_3',
    username: 'rahul_codes',
    fullname: 'Rahul Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    followers: ['user_1', 'user_2', 'user_4'],
    following: ['user_1', 'user_2', 'user_4'],
  },
  {
    _id: 'user_4',
    username: 'aman_tech',
    fullname: 'Aman Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman',
    followers: ['user_2', 'user_3'],
    following: ['user_3'],
  },
];

// Sample Posts Collection
export const initialPosts: Post[] = [
  {
    _id: 'post_1',
    user_id: 'user_2',
    content: 'Just finished building my first React app! 🚀 The journey was amazing. #coding #react',
    media_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
    media_type: 'image',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: ['user_1', 'user_3'],
    comments: [
      { _id: 'c1', user_id: 'user_1', content: 'Amazing work! Keep it up! 💪', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
    ],
  },
  {
    _id: 'post_2',
    user_id: 'user_3',
    content: 'Coffee + Code = Perfect Monday ☕ Who else is grinding today?',
    media_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
    media_type: 'image',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: ['user_1', 'user_2', 'user_4'],
    comments: [],
  },
  {
    _id: 'post_3',
    user_id: 'user_1',
    content: 'Learning NoSQL databases today. MongoDB is so intuitive for social media apps!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: ['user_3'],
    comments: [
      { _id: 'c2', user_id: 'user_3', content: 'NoSQL is the way to go for scalability!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) },
    ],
  },
  {
    _id: 'post_4',
    user_id: 'user_4',
    content: 'Beautiful sunset from my balcony today 🌅',
    media_url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600',
    media_type: 'image',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    likes: ['user_2'],
    comments: [],
  },
];

// Generate unique IDs
export const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
