import React, { useState } from 'react';
import { useSocial } from '@/contexts/SocialContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Image, Video, Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { currentUser, createPost } = useSocial();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [showMediaInput, setShowMediaInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "Cannot post",
        description: "Please write something first!",
        variant: "destructive",
      });
      return;
    }

    createPost(content, mediaUrl || undefined, mediaType || undefined);
    setContent('');
    setMediaUrl('');
    setMediaType(null);
    setShowMediaInput(false);
    
    toast({
      title: "Posted! 🎉",
      description: "Your post is now live in the feed.",
    });
    
    onPostCreated?.();
  };

  const handleAddMedia = (type: 'image' | 'video') => {
    setMediaType(type);
    setShowMediaInput(true);
  };

  const clearMedia = () => {
    setMediaUrl('');
    setMediaType(null);
    setShowMediaInput(false);
  };

  if (!currentUser) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>Create Post</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.fullname.split(' ')[0]}?`}
            className="min-h-[100px] resize-none"
          />

          {showMediaInput && (
            <div className="flex gap-2 items-center animate-fade-in">
              <Input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder={`Enter ${mediaType} URL...`}
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="icon" onClick={clearMedia}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {mediaUrl && (
            <div className="rounded-lg overflow-hidden border animate-fade-in">
              {mediaType === 'video' ? (
                <video src={mediaUrl} controls className="w-full max-h-48 object-cover" />
              ) : (
                <img src={mediaUrl} alt="Preview" className="w-full max-h-48 object-cover" />
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddMedia('image')}
                className="gap-2"
              >
                <Image className="h-4 w-4" />
                Image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddMedia('video')}
                className="gap-2"
              >
                <Video className="h-4 w-4" />
                Video
              </Button>
            </div>

            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
