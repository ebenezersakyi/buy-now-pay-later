import firebase from "firebase/compat/app";
import "firebase/storage";
import app, { auth } from "../firebaseConfig";
// import {app} from '../firebaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { API_URL } from "@env";

export const productCategories = [
  { name: "Clothes", icon: "tshirt-crew" },
  { name: "Shoes", icon: "shoe-sneaker" },
  { name: "Bags", icon: "bag-checked" },
  { name: "Electronics", icon: "laptop" },
  { name: "Watch", icon: "watch" },
  { name: "Jewelry", icon: "diamond-stone" },
  { name: "Kitchen", icon: "fridge" },
  { name: "Toys", icon: "toy-brick" },
];

export const imageUpload = async (image) => {
  try {
    const pic = image;
    const filename = Math.random().toString(36);

    const storage = getStorage(app); // Get storage instance
    const uri = pic.uri;
    const childPath = `profile/${filename}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload the blob to Firebase Storage
    await uploadBytes(ref(storage, childPath), blob);

    // Get download URL
    const downloadURL = await getDownloadURL(ref(storage, childPath));

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Error", "Failed to upload image.");
    return "";
  }
};

export const saveUserData = async (email, role) => {
  try {
    const response = await axios.post(`${API_URL}user/users`, {
      email: email,
      role: role,
    });

    const data = response?.data;
    console.log("saveUserData", data);
    // setUserDetails(data);
    return { success: true, data: data };
  } catch (error) {
    console.log("save error: ", error);
    return { success: false, data: error };
  }
};

export const getUserDetailsByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${API_URL}user/users-by-firbase-id/${email}`
    );

    const data = response?.data;
    console.log("saveUserData", data);
    // setUserDetails(data);
    return { success: true, data: data };
  } catch (error) {
    console.log("save error: ", error);
    return { success: false, data: error };
  }
};

export const getSellerProducts = async (userID) => {
  try {
    const response = await axios.get(
      `${API_URL}product/user-products/${userID}`
    );

    const data = response?.data;
    console.log("saveUserData", data);
    // setUserDetails(data);
    return { success: true, data: data };
  } catch (error) {
    console.log("save error: ", error);
    return { success: false, data: error };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}product/products`);

    const data = response?.data;
    console.log("saveUserData", data);
    // setUserDetails(data);
    return { success: true, data: data };
  } catch (error) {
    console.log("save error: ", error);
    return { success: false, data: error };
  }
};
