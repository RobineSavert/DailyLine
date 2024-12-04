import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../js/firebase';
import { useAuthStore } from '@/stores/AuthStore';
import { useMessageStore } from '@/stores/MessagesStore';

export const useThemeStore = defineStore('themeStore', () => {
    const themeName = ref('wildflowers');  // Default theme
    const authStore = useAuthStore();
    const messageStore = useMessageStore();

    // Fetch the user's theme from the database
    const fetchUserTheme = async () => {
        const userId = authStore.user?.uid;

        if (!userId) {
            themeName.value = 'wildflowers';
            document.body.setAttribute("data-theme", themeName.value);
            return;
        }

        const settingsDoc = doc(db, 'users', userId, 'settings', 'preferences');
        const docSnapshot = await getDoc(settingsDoc);

        if (docSnapshot.exists()) {
            themeName.value = docSnapshot.data().themeName || 'wildflowers';  // Default to 'wildflowers' if not found
        } else {
            themeName.value = 'wildflowers';
        }

        // Apply the theme globally
        document.body.setAttribute("data-theme", themeName.value);
    };

    // Update the user's theme in the database
    const updateUserTheme = async (newThemeName) => {
        const userId = authStore.user?.uid;

        if (!userId) {
            console.error('User ID is undefined');
            themeName.value = newThemeName;
            document.body.setAttribute("data-theme", newThemeName);
            return;
        }

        const settingsDoc = doc(db, 'users', userId, 'settings', 'preferences');

        try {
            await setDoc(settingsDoc, { themeName: newThemeName }, { merge: true });
            themeName.value = newThemeName;
            document.body.setAttribute("data-theme", newThemeName);
        } catch (error) {
            console.error('Error updating theme in Firestore:', error);
            messageStore.addMessage(1, { title: 'settings.theme_error: ' + error });
        }
    };


    return {
        themeName,
        fetchUserTheme,
        updateUserTheme,
    };
});
