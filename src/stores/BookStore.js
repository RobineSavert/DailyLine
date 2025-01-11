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

        if (!userId) {
            bookName.value = 'my book';
            return;
        }

        const settingsDoc = doc(db, 'users', userId, 'settings', 'preferences');
        const docSnapshot = await getDoc(settingsDoc);

        if (docSnapshot.exists()) {
            bookName.value = docSnapshot.data().bookName || 'my book';  // Default to 'wildflowers' if not found
        } else {
            bookName.value = 'my book';
        }

        return bookName.value
    };

    // Update the user's theme in the database
    const updateBookName = async (newBookName) => {
        const userId = authStore.user?.uid;

        if (!userId) {
            console.error('User ID is undefined');
            bookName.value = newBookName;

            return;
        }

        const settingsDoc = doc(db, 'users', userId, 'settings', 'preferences');

        try {
            await setDoc(settingsDoc, { bookName: newBookName }, { merge: true });
            bookName.value = newBookName;
        } catch (error) {
            console.error('Error updating bookname in Firestore:', error);
            messageStore.addMessage(1, { title: 'settings.book_error: ' + error });
        }
    };


    return {
        bookName,
        fetchBookName,
        updateBookName,
    };
});
