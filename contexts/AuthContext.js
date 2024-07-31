import React, { useContext, useState, useEffect } from "react";
import { auth, app } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetailsByEmail } from "../utils";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [churchDetails, setChurchDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);

  async function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then((data) => {
      setCurrentUser(data?.user);
    });
    return;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await AsyncStorage.clear();
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function changeTheme() {}

  async function fetchUserDetails(email) {
    setUserDetailsLoading(true);
    const response = await getUserDetailsByEmail(auth?.currentUser?.email);
    setUserDetails(response?.data);
    await AsyncStorage.setItem("userDetails", JSON.stringify(response?.data));

    // try {
    //   const response = await axios.get(
    //     `${API_URL}user/users-email/${email || currentUser.email}`
    //   );

    //   const data = response?.data?.data;
    //   if (data) {
    //     setUserDetails(data);
    //     const stringified = JSON.stringify(data);
    //     await AsyncStorage.setItem("userDetails", stringified);
    //     convertAndSaveBase64ProfilePic(data?.profilePicture);
    //   }
    // } catch (error) {
    //   console.log("Fetch Error: ", error);
    // }
  }

  async function saveUserData(fullName, profilePicture, church, email) {
    setUserDetailsLoading(true);
    try {
      const response = await axios.post(`${API_URL}user/users`, {
        fullName,
        profilePicture,
        userId: auth?.currentUser?.uid,
        email,
        church: church,
      });

      const data = response?.data;
      console.log("saveUserData", data);
      setUserDetails(data);
      return;
    } catch (error) {
      console.log("save error: ", error);
      return;
    }
  }

  useEffect(() => {
    (async () => {
      const cachedUserDetails = await AsyncStorage.getItem("userDetails");
      if (cachedUserDetails) {
        const parsed = JSON.parse(cachedUserDetails);
        setUserDetails(parsed);
      }
    })();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserDetails(currentUser.email);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    fetchUserDetails,
    userDetails,
    userDetailsLoading,
    saveUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && (
        <>
          <StatusBar style={"dark"} />
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}
