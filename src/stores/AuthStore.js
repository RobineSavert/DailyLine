import {
  createUserWithEmailAndPassword, getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../js/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLinesStore } from './LinesStore';
import {useMessageStore} from "@/stores/store-messages";


export const useAuthStore = defineStore('authStore', () => {
  const user = ref({}); // De gebruiker wordt opgeslagen als een `ref`
  const router = useRouter();
  const messageStore = useMessageStore();
  const linesStore = useLinesStore();
  const isLoggedIn = ref(false)
  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        const uid = userDetails.uid;
        const displayName = userDetails.displayName;
        const photoURL = userDetails.photoURL;
        user.value = { email: userDetails.email, uid, displayName, photoURL };
        isLoggedIn.value = true;
        router.push({ name: 'dashboard'});
        linesStore.getLines();
      } else {
        user.value = {};
        isLoggedIn.value = false;
        router.replace({ name: 'auth' });
        linesStore.clearLines();
      }
    });
  };
  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          messageStore.addMessage( { title: error.message, type: 'danger' });
        });
  };

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          messageStore.addMessage({ title: error.message, type: 'danger' });
        });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        user.value = null;
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const auth = getAuth();

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
          messageStore.addMessage({ title: 'auth.forgot_password_success' });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          messageStore.addMessage({ title: errorMessage, type: 'danger' });
        });
  }

  const updateUser = (newUserData) => {
    user.value = { ...user.value, ...newUserData };
  };


  return {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    updateUser,
    init,
    user,
    isLoggedIn
  };
});
