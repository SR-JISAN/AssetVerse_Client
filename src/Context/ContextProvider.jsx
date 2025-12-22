import React, { Suspense, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Loading from "../pages/Loading/Loading.jsx";
import { auth } from "../firebase/firebase.init.js";
import { useQuery } from "@tanstack/react-query";
import useAxiosUrl from "../hooks/useAxiosUrl.jsx";


function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const singOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSignIn = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleSignIn);
  };
  const updateUserProfile = (profile) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile);
    } else {
      return Promise.reject(new Error("No user is signed in"));
    }
  };
  // observer

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (crrUser) => {
      setUser(crrUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const axiosUrl=useAxiosUrl()
  const { data: dbUser, isLoading: roleLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosUrl.get(
        `/users/${user.email}`
      );
      return res.data;
    },
  });

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    singOutUser,
    updateUserProfile,
    user,
    dbUser,   
    loading: loading || roleLoading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      <Suspense fallback={<Loading></Loading>}>{children}</Suspense>
    </AuthContext.Provider>
  );
}

export default ContextProvider;
