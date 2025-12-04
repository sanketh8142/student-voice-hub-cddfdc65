import React, { useState } from 'react';
import { useSocial } from '@/contexts/SocialContext';
import { Post } from '@/lib/socialData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommentsModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ post, open, onOpenChange }) => {
  const { getUserById, addComment } = useSocial();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post._id, newComment);
      setNewComment('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Comments ({post.comments.length})</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-80 pr-4">
          {post.comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {post.comments.map((comment) => {
                const commenter = getUserById(comment.user_id);
                if (!commenter) return null;
                
                return (
                  <div key={comment._id} className="flex gap-3 animate-fade-in">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={commenter.avatar} />
                      <AvatarFallback>{commenter.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <span className="font-semibold text-sm">{commenter.fullname}</span>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newComment.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;
