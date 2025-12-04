import React from 'react';
import { Helmet } from 'react-helmet-async';
import SocialHeader from '@/components/social/SocialHeader';
import Feed from '@/components/social/Feed';
import CreatePostForm from '@/components/social/CreatePostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSocial } from '@/contexts/SocialContext';
import { Database, Users, FileText, Zap } from 'lucide-react';

const SocialFeed: React.FC = () => {
  const { users, posts, currentUser } = useSocial();

  return (
    <>
      <Helmet>
        <title>LiveFeed Social - Real-time Social Media Demo</title>
        <meta name="description" content="A real-time social media feed demo using NoSQL backend architecture" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <SocialHeader />
        
        <main className="container px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - NoSQL Info */}
            <aside className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    NoSQL Demo Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> Users
                    </span>
                    <span className="font-mono font-semibold">{users.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Posts
                    </span>
                    <span className="font-mono font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Zap className="h-4 w-4" /> Update Rate
                    </span>
                    <span className="font-mono font-semibold text-green-500">3s</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-sm mb-2">📊 NoSQL Structure</h3>
                  <pre className="text-xs bg-background rounded p-2 overflow-x-auto">
{`// Users Collection
{
  _id: "user_1",
  username: "arjun_dev",
  following: ["user_2"]
}

// Posts Collection
{
  _id: "post_1",
  user_id: "user_1",
  likes: ["user_2"],
  comments: [...]
}`}
                  </pre>
                </CardContent>
              </Card>
            </aside>

            {/* Main Feed */}
            <div className="lg:col-span-6">
              <div className="space-y-6">
                <CreatePostForm />
                <Feed />
              </div>
            </div>

            {/* Right Sidebar - Following Info */}
            <aside className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Following ({currentUser?.following.length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentUser?.following.map((followId) => {
                    const followedUser = users.find(u => u._id === followId);
                    if (!followedUser) return null;
                    return (
                      <div key={followId} className="flex items-center gap-2 py-2">
                        <img 
                          src={followedUser.avatar} 
                          alt={followedUser.username}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{followedUser.fullname}</span>
                          <span className="text-xs text-muted-foreground">@{followedUser.username}</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default SocialFeed;
