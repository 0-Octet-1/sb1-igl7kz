import React from 'react';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader />
      
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}