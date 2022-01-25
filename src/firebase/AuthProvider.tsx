import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
