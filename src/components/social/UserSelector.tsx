import React from 'react';
import { useSocial } from '@/contexts/SocialContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserSelector: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useSocial();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Viewing as:</span>
      <Select
        value={currentUser?._id}
        onValueChange={(value) => {
          const user = users.find(u => u._id === value);
          if (user) setCurrentUser(user);
        }}
      >
        <SelectTrigger className="w-[200px] bg-card">
          <SelectValue>
            {currentUser && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{currentUser.fullname}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{user.fullname}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelector;
