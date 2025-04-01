import { defineStore } from 'pinia';
import {auth, db} from '../js/firebase';
import {useMessageStore} from "@/stores/MessagesStore";
import {getAuth, updateProfile, updateEmail, updatePassword, verifyBeforeUpdateEmail, signOut} from "firebase/auth";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore";


export const useAccountStore = defineStore('accountStore', () => {
    const messageStore = useMessageStore();
    const router = useRouter();
    const route = useRoute();
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
            router.push({ name: 'account', params: {locale: route.params.locale} });
            messageStore.addMessage(0,{ title: 'account.update_success' });
        }).catch((error) => {
            messageStore.addMessage(1,{ title: error.message, type: 'danger' });
        });
    };

    // const updateUserEmail = (email) => {
    //     updateEmail(auth.currentUser, email).then(() => {
    //         messageStore.addMessage(0,{ title: 'account.update_email_success' });
    //     }).catch((error) => {
    //         messageStore.addMessage(1,{ title: error.message, type: 'danger' });
    //     });
    // }
    const updateUserEmail = (email) => {
        verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
            authStore.logoutUser();
        }).catch((error) => {
            messageStore.addMessage(1,{ title: error.message, type: 'danger' });
        });
    }

    const updateUserPassword = (newPassword) => {
        updatePassword(user, newPassword).then(() => {
            messageStore.addMessage(0,{ title: 'account.update_password_success' });
        }).catch((error) => {
            messageStore.addMessage(1,{ title: error.message, type: 'danger' });
        });
    }

    async function updatePhotoUrl(downloadUrl) {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            try {
                await updateProfile(user, {
                    photoURL: downloadUrl,
                });
                messageStore.addMessage(0,{ title: 'account.update_photo_success' });
            } catch (error) {
                messageStore.addMessage(0,{ title: error });
            }
        }
    }

    return {
        getUser,
        updateAccount,
        updateUserEmail,
        updateUserPassword,
        updatePhotoUrl,
        user
    };
});
