import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../../firebase.config.json'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAEM-e8Yrt0XzXUHqfe5NgEkZ0LiczLvwE",
//   authDomain: "weather-app-react-75b90.firebaseapp.com",
//   projectId: "weather-app-react-75b90",
//   storageBucket: "weather-app-react-75b90.appspot.com",
//   messagingSenderId: "82549022184",
//   appId: "1:82549022184:web:33d126fa09a1d7eec2d85d"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authProvider = getAuth(app);
export default authProvider;