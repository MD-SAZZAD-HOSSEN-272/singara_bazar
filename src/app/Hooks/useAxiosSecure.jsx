import axios from "axios";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { auth } from "../Components/firebase";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});

export default function useAxiosSecure() {

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const token = await user.getIdToken();

  //       console.log(token)

  //       // send token to backend → backend sets HttpOnly cookie
  //       await axios.post(
  //         "http://localhost:4000/set-token",
  //         { token },
  //         { withCredentials: true }
  //       );
  //     } else {
  //       // clear cookie on logout
  //       await axios.post(
  //         "http://localhost:4000/logout",
  //         {},
  //         { withCredentials: true }
  //       );
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return axiosSecure;
}
