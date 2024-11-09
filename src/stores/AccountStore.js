
import { defineStore } from 'pinia';
import {auth, db} from '../js/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLinesStore } from './LinesStore';
import {useMessageStore} from "@/stores/store-messages";
import {addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";


export const useAccountStore = defineStore('accountStore', () => {
    const user = ref({});
    const router = useRouter();
    const messageStore = useMessageStore();
    const linesStore = useLinesStore();
    const isLoggedIn = ref(false)
    const auth = getAuth();

    const updateAccount = (user) => {
        updateProfile(auth.currentUser, {
            displayName: user.displayName, photoURL: user.photoURL
        }).then(() => {
            messageStore.addMessage( { title: 'account.update_success' });
        }).catch((error) => {
            messageStore.addMessage( { title: error.message, type: 'danger'});
        });
    }

    return {
        updateAccount,
        user
    };
});
