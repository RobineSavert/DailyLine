import { defineStore } from 'pinia';
import { db } from '../js/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/stores/AuthStore";

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        bookName: '', // Houd de huidige bookName lokaal bij
    }),
    actions: {
        async fetchBookName() {
            const authStore = useAuthStore();
            const userId = authStore.user?.uid;

            if (!userId) return;

            const userDoc = doc(db, "users", userId);
            const docSnapshot = await getDoc(userDoc);

            if (docSnapshot.exists()) {
                this.bookName = docSnapshot.data().bookName || '';
            }
        },

        async updateBookName(bookName) {
            const authStore = useAuthStore();
            const userId = authStore.user?.uid;

            if (!userId) return;

            const userDoc = doc(db, "users", userId);

            try {
                await setDoc(userDoc, { bookName }, { merge: true });
                this.bookName = bookName;
            } catch (error) {
                console.error("Error updating bookName:", error);
            }
        }
    }
});
