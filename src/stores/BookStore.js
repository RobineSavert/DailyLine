import { defineStore } from 'pinia';
import {db, storage} from '../js/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/stores/AuthStore";
import {useMessageStore} from "@/stores/MessagesStore";
import { uploadBytes, getDownloadURL, ref as storageRef } from "firebase/storage";  // Import necessary Firebase Storage functions

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        bookName: '', // Houd de huidige bookName lokaal bij
        bookCover: null,
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
            const messageStore = useMessageStore()

            if (!userId) return;

            const userDoc = doc(db, "users", userId);

            try {
                await setDoc(userDoc, { bookName }, { merge: true });
                this.bookName = bookName;
            } catch (error) {
                console.log(error)
            }
        },

        async fetchBookCover() {
            const user = useAuthStore().user; // Ensure you're getting user data if necessary
            if (user?.bookCover) {
                this.bookCover = user.bookCover; // Or get the URL from Firebase
            }
        },

        // New action to upload image and save URL to Firestore
        async uploadAndSaveBookCover(file) {
            const authStore = useAuthStore();
            const userId = authStore.user?.uid;

            if (!userId || !file) {
                console.error("No user or file found");
                return;
            }

            // Create a unique path in Firebase Storage for this file
            const storagePath = `covers/${userId}_${Date.now()}.jpg`;
            const fileRef = storageRef(storage, storagePath);  // Correct reference to Firebase Storage

            try {
                // Upload the file to Firebase Storage
                await uploadBytes(fileRef, file);  // Upload the file to Firebase

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(fileRef);  // Fetch the URL of the uploaded file

                // Now update the Firestore with the image URL
                await this.updateBookCover(downloadURL);  // Save the URL in Firestore
                console.log("Image uploaded and Firestore updated successfully:", downloadURL);

                return downloadURL;  // Return the URL if needed in the component
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        },

        // Action to save the book cover URL in Firestore
        async updateBookCover(imageUrl) {
            const authStore = useAuthStore();
            const userId = authStore.user?.uid;

            if (!userId || !imageUrl) {
                console.error("No user ID or image URL provided");
                return;
            }

            const userDoc = doc(db, "users", userId);

            try {
                await setDoc(userDoc, { bookCover: imageUrl }, { merge: true });
                this.bookCover = imageUrl;  // Update the local state
                console.log("Book cover updated in Firestore");
            } catch (error) {
                console.error("Error updating book cover:", error);
            }
        }
    }
});
