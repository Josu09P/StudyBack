import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD8AtH2rZzR2O5kVzQ1F-N0VxyDKyh_Df0",
    authDomain: "studyback-db.firebaseapp.com",
    projectId: "studyback-db",
    storageBucket: "studyback-db.appspot.com",
    messagingSenderId: "455394668708",
    appId: "1:455394668708:web:0fd6bb1e75cfaf7c047631"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  export { db, auth, storage, deleteObject};

  export async function loginUserWithEmailAndPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario iniciado sesión:", user);
      return user;
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      throw error;
    }
  }

     // Initialize roles in Firestore
   async function initializeRoles() {
         const rolesRef = collection(db, "roles");
  
           const roles = ["SUPER_ADMIN", "ADMIN", "USUARIO"];
           roles.forEach(async (role) => {
        await setDoc(doc(rolesRef, role), { name: role });
    });
  
    console.log("Roles initialized.");
  }
  
     initializeRoles();
  
     // Function to register a user with a role
export async function registerUser(email, password, role) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role
      });
  
      console.log("User registered:", user);
      return user;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
  