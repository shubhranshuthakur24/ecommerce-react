import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getProducts } from "./redux/slices/products";
import PagesRoute from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./helper/firebase.config";
import { GUEST_LOGGED_IN, USER_LOGGED_IN } from "./redux/slices/user";
import { createUserData, getUserData } from "./helper/firebase.data";

function App() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
  }, [products]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user && !user.isAnonymous) {
        const userData = await getUserData(user!.uid);
        dispatch(USER_LOGGED_IN(userData));
      } else if (user && user.isAnonymous) {
        const userData = await getUserData(user!.uid);
        dispatch(GUEST_LOGGED_IN(userData));
      } else if (!user) {
        try {
          const guestUser = await signInAnonymously(auth);
          await createUserData(guestUser.user.uid, "guest", [], []);
        } catch (error: any) {
          // Anonymous auth may be disabled in Firebase Console.
          // The app still works for signed-in users.
          console.warn("Anonymous sign-in unavailable:", error?.code);
        }
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <PagesRoute />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
