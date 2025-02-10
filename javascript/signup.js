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
// console.log("Firebase initialized"); 
const auth = getAuth(app);
const database = getDatabase(app);

document.querySelector("#signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("Form submitted"); 

  // Get values from the form
  const email = document.querySelector("#business_email").value;
  const password = document.querySelector("#business_password").value;
  const businessName = document.querySelector("#business_name").value;
  const registeredLocation = document.querySelector("#business_registered").value;

  // console.log("Form data:", email, password, businessName, registeredLocation);

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // console.log("User created:", user);

    // After creating the user, store additional data in Realtime Database
    const userRef = ref(database, 'users/' + user.uid);
    await set(userRef, {
      accountType:"business",
      businessName: businessName,
      email: email,
      registeredLocation: registeredLocation,
      password:password,
      createdAt: new Date().toISOString(),
    });

    // console.log("User data stored in the database!");
    alert('Business account created successfully!');
    window.location.href = '../index.html';
  } catch (error) {
    console.error("Error creating user: ", error.message);
  }
});



//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
//   import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
//   import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyA-8DveOlIlHvyK813rJbm4q-xTpdtb9n0",
//     authDomain: "users-database-e953e.firebaseapp.com",
//     databaseURL: "https://users-database-e953e-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "users-database-e953e",
//     storageBucket: "users-database-e953e.firebasestorage.app",
//     messagingSenderId: "622398829390",
//     appId: "1:622398829390:web:930571c5fb5aa985a3641f"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   const auth = getAuth(app);
//   const db = getDatabase(app);

//   // Handle sign-up form submission
// document.querySelector("#signup-form").addEventListener('click', async (e) => {
//     e.preventDefault();
    
//     // Get form values
//     const businessName = document.getElementById('business_name').value;
//     const businessEmail = document.getElementById('business_email').value;
//     const businessPassword = document.getElementById('business_password').value;
//     const businessRegistered = document.getElementById('business_registered').value;
    
//     // Basic form validation
//     if (!businessName || !businessEmail || !businessPassword || !businessRegistered) {
//       alert('Please fill in all fields!');
//       return;
//     }
  
//     try {
//       // Create a new user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       // console.log('User Registered:', user);
  
//       // Store additional business information in Firebase Realtime Database
//       const userRef = ref(db, 'users/' + user.uid);
//       await set(userRef, {
//         accountType:"business",
//         businessName: businessName,
//         email: email, 
//         createdAt: new Date().toISOString(),
//         // businessRegistered: businessRegistered,
//         // interestedInBuying: document.getElementById('interested-in-buying').checked
//       });
  
//       // On successful sign-up, alert the user and optionally redirect
//       alert('Business account created successfully!');
//       window.location.href = '../html/login.html';  
  
//     } catch (error) {
//       console.error('Error signing up:', error.message);
//       alert('Error signing up: ' + error.message);
//     }
//   });



