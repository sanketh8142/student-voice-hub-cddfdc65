import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Post, Comment, initialUsers, initialPosts, generateId } from '@/lib/socialData';

interface SocialContextType {
  users: User[];
  posts: Post[];
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  getUserFeed: (userId: string) => Post[];
  createPost: (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  getUserById: (userId: string) => User | undefined;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(initialUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsers[0]);

  const getUserById = useCallback((userId: string) => {
    return users.find(u => u._id === userId);
  }, [users]);

  // Get feed for user (posts from followed users + own posts)
  const getUserFeed = useCallback((userId: string): Post[] => {
    const user = users.find(u => u._id === userId);
    if (!user) return [];
    
    const followingIds = [...user.following, userId];
    return posts
      .filter(post => followingIds.includes(post.user_id))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [users, posts]);

  // Create a new post
  const createPost = useCallback((content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => {
    if (!currentUser) return;
    
    const newPost: Post = {
      _id: `post_${generateId()}`,
      user_id: currentUser._id,
      content,
      media_url: mediaUrl,
      media_type: mediaType,
      timestamp: new Date(),
      likes: [],
      comments: [],
    };
    
    setPosts(prev => [newPost, ...prev]);
  }, [currentUser]);

  // Toggle like on a post
  const toggleLike = useCallback((postId: string) => {
    if (!currentUser) return;
    
    setPosts(prev => prev.map(post => {
      if (post._id !== postId) return post;
      
      const hasLiked = post.likes.includes(currentUser._id);
      return {
        ...post,
        likes: hasLiked 
          ? post.likes.filter(id => id !== currentUser._id)
          : [...post.likes, currentUser._id],
      };
    }));
  }, [currentUser]);

  // Add comment to a post
  const addComment = useCallback((postId: string, content: string) => {
    if (!currentUser || !content.trim()) return;
    
    const newComment: Comment = {
      _id: `comment_${generateId()}`,
      user_id: currentUser._id,
      content,
      timestamp: new Date(),
    };
    
    setPosts(prev => prev.map(post => {
      if (post._id !== postId) return post;
      return {
        ...post,
        comments: [...post.comments, newComment],
      };
    }));
  }, [currentUser]);

  return (
    <SocialContext.Provider value={{
      users,
      posts,
      currentUser,
      setCurrentUser,
      getUserFeed,
      createPost,
      toggleLike,
      addComment,
      getUserById,
    }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
