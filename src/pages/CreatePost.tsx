import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import SocialHeader from '@/components/social/SocialHeader';
import CreatePostForm from '@/components/social/CreatePostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const handlePostCreated = () => {
    setTimeout(() => navigate('/social'), 500);
  };

  return (
    <>
      <Helmet>
        <title>Create Post - LiveFeed Social</title>
        <meta name="description" content="Create a new post on LiveFeed Social" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <SocialHeader />
        
        <main className="container max-w-2xl px-4 py-6">
          <Button asChild variant="ghost" className="mb-4 gap-2">
            <Link to="/social">
              <ArrowLeft className="h-4 w-4" />
              Back to Feed
            </Link>
          </Button>

          <div className="space-y-6">
            <CreatePostForm onPostCreated={handlePostCreated} />

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Tips for Creating Posts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Keep your posts engaging and authentic</p>
                <p>• Add images using URLs from Unsplash or other sources</p>
                <p>• Your post will appear instantly in the feed</p>
                <p>• Others can like and comment on your posts</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-sm mb-2">🔧 How NoSQL Handles This</h3>
                <pre className="text-xs bg-background rounded p-2 overflow-x-auto">
{`// When you create a post:
await db.collection("posts").insertOne({
  _id: ObjectId(),
  user_id: currentUser._id,
  content: "Your post text...",
  media_url: "https://...",
  timestamp: new Date(),
  likes: [],
  comments: []
})`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreatePost;
