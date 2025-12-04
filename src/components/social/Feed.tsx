import React, { useEffect, useState } from 'react';
import { useSocial } from '@/contexts/SocialContext';
import PostCard from './PostCard';
import { Post } from '@/lib/socialData';
import { Loader2 } from 'lucide-react';

const Feed: React.FC = () => {
  const { currentUser, getUserFeed } = useSocial();
  const [feed, setFeed] = useState<Post[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Real-time simulation: refresh feed every 3 seconds
  useEffect(() => {
    if (!currentUser) return;

    const updateFeed = () => {
      const newFeed = getUserFeed(currentUser._id);
      setFeed(newFeed);
      setLastUpdate(new Date());
    };

    updateFeed();
    const interval = setInterval(updateFeed, 3000);
    
    return () => clearInterval(interval);
  }, [currentUser, getUserFeed]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing posts from people you follow</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Live updates
        </span>
      </div>

      {feed.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts yet. Follow more people or create your first post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feed.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
