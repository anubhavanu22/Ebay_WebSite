import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA-8DveOlIlHvyK813rJbm4q-xTpdtb9n0",
    authDomain: "users-database-e953e.firebaseapp.com",
    databaseURL: "https://users-database-e953e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "users-database-e953e",
    storageBucket: "users-database-e953e.firebasestorage.app",
    messagingSenderId: "622398829390",
    appId: "1:622398829390:web:930571c5fb5aa985a3641f"
  };

//Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized"); 
const auth = getAuth(app);
const database = getDatabase(app);

document.querySelector("#signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form submitted"); 

  // Get values from the form
  const email = document.querySelector("#personal_email").value;
  const password = document.querySelector("#personal_password").value;
  const personal_Firstname = document.querySelector("#personal_Firstname").value;
  const personal_Lastname = document.querySelector("#personal_Lastname").value;

  console.log("Form data:", email, password);

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created:", user);

    // After creating the user, store additional data in Realtime Database
    const userRef = ref(database, 'users/' + user.uid);
    await set(userRef, {
      accountType:"personal",
      personal_Firstname: personal_Firstname,
      personal_Lastname:personal_Lastname,
      password : password,
      email: email,
      createdAt: new Date().toISOString(),
    });

    console.log("User data stored in the database!");
    alert('Personal account created successfully!');
    window.location.href = '../html/home.html';
  } catch (error) {
    console.error("Error creating user: ", error.message);
  }
});