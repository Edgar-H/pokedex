import { createContext, useEffect, useState } from 'react';
import { auth } from '../util/firebaseConfig';

export const Auth = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return <Auth.Provider value={{ user }}>{children}</Auth.Provider>;
};
