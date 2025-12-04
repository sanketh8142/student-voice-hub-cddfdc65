import React, { useState } from 'react';
import { useSocial } from '@/contexts/SocialContext';
import { Post } from '@/lib/socialData';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CommentsModal from './CommentsModal';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { getUserById, currentUser, toggleLike } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const author = getUserById(post.user_id);
  const hasLiked = currentUser ? post.likes.includes(currentUser._id) : false;

  const handleLike = () => {
    setIsLikeAnimating(true);
    toggleLike(post._id);
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  if (!author) return null;

  return (
    <>
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
        <CardHeader className="flex flex-row items-center gap-3 pb-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{author.fullname}</span>
            <span className="text-xs text-muted-foreground">
              @{author.username} • {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
          {post.media_url && (
            <div className="mt-3 rounded-lg overflow-hidden">
              {post.media_type === 'video' ? (
                <video src={post.media_url} controls className="w-full max-h-96 object-cover" />
              ) : (
                <img 
                  src={post.media_url} 
                  alt="Post media" 
                  className="w-full max-h-96 object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t pt-3 flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 transition-all duration-200 ${hasLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
          >
            <Heart 
              className={`h-5 w-5 transition-transform duration-200 ${isLikeAnimating ? 'scale-125' : ''} ${hasLiked ? 'fill-current' : ''}`} 
            />
            <span className="font-medium">{post.likes.length}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(true)}
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">{post.comments.length}</span>
          </Button>
        </CardFooter>
      </Card>

      <CommentsModal 
        post={post} 
        open={showComments} 
        onOpenChange={setShowComments} 
      />
    </>
  );
};

export default PostCard;
