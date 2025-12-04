import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserSelector from './UserSelector';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, Database } from 'lucide-react';

const SocialHeader: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/social" className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              LiveFeed Social
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-2">
            <Button
              asChild
              variant={location.pathname === '/social' ? 'default' : 'ghost'}
              size="sm"
            >
              <Link to="/social" className="gap-2">
                <Home className="h-4 w-4" />
                Feed
              </Link>
            </Button>
            <Button
              asChild
              variant={location.pathname === '/social/create' ? 'default' : 'ghost'}
              size="sm"
            >
              <Link to="/social/create" className="gap-2">
                <PlusSquare className="h-4 w-4" />
                Create
              </Link>
            </Button>
          </nav>
        </div>

        <UserSelector />
      </div>
    </header>
  );
};

export default SocialHeader;
