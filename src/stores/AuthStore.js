import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../js/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLinesStore } from './LinesStore';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref({});
  const router = useRouter();
  const errorMessage = ref('')
  const linesStore = useLinesStore();
  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        const uid = userDetails.uid;
        user.value = { email: userDetails.email, uid };
        router.push({ name: 'lines' });
        linesStore.getLines();
      } else {
        user.value = {};
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
          errorMessage.value = error.message;
        });
  };

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          errorMessage.value = error.message;
        });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {

        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    init,
    user,
    errorMessage
  };
});
