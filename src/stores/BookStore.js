import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../js/firebase';
import { useAuthStore } from '@/stores/AuthStore';
import { useMessageStore } from '@/stores/MessagesStore';

export const useBookStore = defineStore('bookStore', () => {
    const bookName = ref('');
    const authStore = useAuthStore();
    const messageStore = useMessageStore();

    const fetchBookName = async () => {
        const userId = authStore.user?.uid;

        if (!userId) return;

        const userDoc = doc(db, 'users', userId);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
            bookName.value = docSnapshot.data().bookName || '';
        }
    };

    const updateBookName = async (newBookName) => {
        const userId = authStore.user?.uid;

        if (!userId) return;

        const userDoc = doc(db, 'users', userId);

        try {
            await setDoc(userDoc, { bookName: newBookName }, { merge: true });
            bookName.value = newBookName;
        } catch (error) {
            console.error('Error updating book name:', error);
        }
    };

    return {
        bookName,
        fetchBookName,
        updateBookName,
    };
});
