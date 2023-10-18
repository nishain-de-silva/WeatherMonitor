import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../firebase.config.json'
import { useContext } from "react";
import AuthContext from "../context/authContext";

// Initialize Firebase
export const useAuth = () => {
    return useContext(AuthContext)
}
const app = initializeApp(firebaseConfig);
const authProvider = getAuth(app);
export default authProvider;