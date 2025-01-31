import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../js/firebase';
import { ref } from 'vue';
import { useLinesStore } from './LinesStore';
import { useMessageStore } from "@/stores/MessagesStore";

export const useAuthStore = defineStore('authStore', () => {
  const user = ref({});
  const isLoggedIn = ref(false);
  const messageStore = useMessageStore();
  const linesStore = useLinesStore();

  const checkAuthState = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (userDetails) => {
        console.log("Auth state changed", user ? "User logged in" : "User logged out");
        if (userDetails) {
          const { uid, displayName, photoURL, email } = userDetails;
          user.value = { email, uid, displayName, photoURL };
          isLoggedIn.value = true;
          linesStore.getLines();
        } else {
          user.value = {};
          isLoggedIn.value = false;
          linesStore.clearLines();
        }
        unsubscribe();
        resolve();
      });
    });
  };

  // Modify the init function
  const init = async () => {
    await checkAuthState();
  };


  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // You might want to do something with userCredential.user here
        })
        .catch((error) => {
          messageStore.addMessage(1, { title: error.message, type: 'danger' });
        });
  };

  const loginUser = (credentials) => {
    console.log("hier")
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          console.log("succes")
          isLoggedIn.value = true;
        })
        .catch((error) => {
          messageStore.addMessage(1, { title: error.message, type: 'danger' });
        });
  };

  const logoutUser = () => {
    return new Promise((resolve, reject) => {
      signOut(auth)
          .then(() => {
            user.value = null;
            isLoggedIn.value = false;
            resolve();
          })
          .catch((error) => {
            messageStore.addMessage(1, { title: error.message, type: 'danger' });
            reject(error);
          });
    });
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
          messageStore.addMessage(0, { title: 'auth.forgot_password_success' });
        })
        .catch((error) => {
          messageStore.addMessage(1, { title: error.message, type: 'danger' });
        });
  };

  const updateUser = (newUserData) => {
    user.value = { ...user.value, ...newUserData };
  };

  return {
    user,
    isLoggedIn,
    init,
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    updateUser,
    checkAuthState
  };
});