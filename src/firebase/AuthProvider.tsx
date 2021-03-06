import React, { useContext, useEffect, useState } from "react";
import app from "./firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext<string | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.email;
        setCurrentUser(uid);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, [currentUser, auth]);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
