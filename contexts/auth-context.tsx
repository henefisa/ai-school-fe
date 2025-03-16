'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading the user from storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('edumanage-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to storage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('edumanage-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edumanage-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Determine role based on email for demo purposes
    let role: UserRole = 'admin';
    if (email.includes('teacher')) {
      role = 'teacher';
    } else if (email.includes('parent')) {
      role = 'parent';
    } else if (email.includes('student')) {
      role = 'student';
    }

    const newUser: User = {
      id: 'user-1',
      name: email
        .split('@')[0]
        .replace('.', ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role,
      avatar: '/placeholder.svg',
    };

    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  // For demo purposes - allows switching between roles
  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, switchRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
