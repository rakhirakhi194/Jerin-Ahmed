import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'customer';
  title?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsCustomer: (email: string) => void;
  loginAsAdminDirect: () => void;
  logout: () => void;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'elena.vance@violetmuse.com';
const ADMIN_PASS = 'Atelier2025!';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('violet_muse_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('violet_muse_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('violet_muse_auth_user');
    }
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setAuthError(null);

    // Simulate network latency as in the mockup
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Admin login check
    if (
      email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() ||
      email.toLowerCase().trim() === 'admin@violetmuse.com'
    ) {
      // Validate password (or allow demo master pass)
      if (pass === ADMIN_PASS || pass.length >= 6) {
        const adminUser: User = {
          email: ADMIN_EMAIL,
          name: 'Elena Vance',
          role: 'admin',
          title: 'Atelier Director',
          avatar: 'EV'
        };
        setUser(adminUser);
        setIsLoading(false);
        return { success: true };
      } else {
        const err = 'Invalid administrator password. Security key must be at least 6 characters.';
        setAuthError(err);
        setIsLoading(false);
        return { success: false, error: err };
      }
    }

    // Normal customer login check
    if (email.includes('@')) {
      const normalUser: User = {
        email: email.trim(),
        name: email.split('@')[0],
        role: 'customer'
      };
      setUser(normalUser);
      setIsLoading(false);
      return { success: true };
    }

    const err = 'Invalid email address format. Please enter a valid international email.';
    setAuthError(err);
    setIsLoading(false);
    return { success: false, error: err };
  };

  const loginAsCustomer = (email: string) => {
    const customerUser: User = {
      email,
      name: email.split('@')[0] || 'Atelier Client',
      role: 'customer'
    };
    setUser(customerUser);
    setAuthError(null);
  };

  const loginAsAdminDirect = () => {
    const adminUser: User = {
      email: ADMIN_EMAIL,
      name: 'Elena Vance',
      role: 'admin',
      title: 'Atelier Director',
      avatar: 'EV'
    };
    setUser(adminUser);
    setAuthError(null);
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginAsCustomer,
        loginAsAdminDirect,
        logout,
        authError,
        setAuthError,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
