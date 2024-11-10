
import { defineStore } from 'pinia';
import {auth, db} from '../js/firebase';
import { ref } from 'vue';
import {useMessageStore} from "@/stores/store-messages";
import {getAuth, updateProfile, updateEmail, updatePassword} from "firebase/auth";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore";


export const useAccountStore = defineStore('accountStore', () => {
    const messageStore = useMessageStore();
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = '';
    const authStore = useAuthStore()

    const getUser = () => {
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
        }
    }

    const updateAccount = (newUser) => {
        updateProfile(auth.currentUser, {
            displayName: newUser.displayName,
            photoURL: newUser.photoURL
        }).then(() => {
            authStore.updateUser(newUser);
            router.push({ name: 'account' });
            messageStore.addMessage({ title: 'account.update_success' });
        }).catch((error) => {
            messageStore.addMessage({ title: error.message, type: 'danger' });
        });
    };

    const updateUserEmail = (email) => {
        updateEmail(auth.currentUser, email).then(() => {
            // authStore.updateUser(newUser);
            router.push({ name: 'account' });
            messageStore.addMessage({ title: 'account.update_success' });
        }).catch((error) => {
            messageStore.addMessage({ title: error.message, type: 'danger' });
        });
    }

    const updateUserPassword = (newPassword) => {
        updatePassword(user, newPassword).then(() => {
            // authStore.updateUser(newUser);
            router.push({ name: 'account' });
            messageStore.addMessage({ title: 'account.update_success' });
        }).catch((error) => {
            messageStore.addMessage({ title: error.message, type: 'danger' });
        });
    }






    return {
        getUser,
        updateAccount,
        updateUserEmail,
        updateUserPassword,
        user
    };
});
