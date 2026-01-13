'use client'

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../Components/firebase";
import { useEffect, useState } from "react";
import UserSkeleton from "../Components/Skeleton/userSkeleton";


export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined); // undefined initially

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser === undefined) return; // auth check চলছে

    if (!currentUser) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) return <UserSkeleton></UserSkeleton>

  return <>{children}</>;
}
