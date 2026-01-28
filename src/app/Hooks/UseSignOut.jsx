import { signOut } from "firebase/auth";

export function UseSignOut() {
    route.push('/login')
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
    });
  return signOut;
}