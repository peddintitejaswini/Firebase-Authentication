// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxY-PETGTQ8j_PUsT4kM4ogvUzeprNBx8",
    authDomain: "login-7e581.firebaseapp.com",
    projectId: "login-7e581",
    storageBucket: "login-7e581.appspot.com",
    messagingSenderId: "767506394020",
    appId: "1:767506394020:web:07eca31f0340f32415ef31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const signupContainer = document.getElementById('signup-container');
const loginContainer = document.getElementById('login-container');
const gotoSignup = document.getElementById('goto-signup');
const gotoLogin = document.getElementById('goto-login');

const signupForm = document.getElementById('signup-form');
const signupFullname = document.getElementById('signup-fullname');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('signup-confirm-password');

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

// Toggle between sign up and login forms
gotoSignup.addEventListener('click', () => {
    loginContainer.classList.remove('active');
    signupContainer.classList.add('active');
});

gotoLogin.addEventListener('click', () => {
    signupContainer.classList.remove('active');
    loginContainer.classList.add('active');
});

// Sign Up
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;
    const fullName = signupFullname.value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
                displayName: fullName
            }).then(() => {
                alert('Sign up successful');
                signupForm.reset();
            }).catch((error) => {
                alert(`Error: ${error.message}`);
            });
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in
            const user = userCredential.user;
            alert('Login successful');
            loginForm.reset();
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

// Initial view
signupContainer.classList.add('active');
