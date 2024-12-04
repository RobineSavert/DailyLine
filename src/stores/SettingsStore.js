import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../js/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuthStore } from '@/stores/AuthStore';
import { useMessageStore } from '@/stores/MessagesStore';

export const useSettingsStore = defineStore('settings', () => {
    const autoFillMissingDays = ref(true);  // Default value, will be loaded from the database
    const authStore = useAuthStore();
    const messageStore = useMessageStore();

    const fetchAutoFillLines = async () => {
        const userId = authStore.user?.uid;

        if (!userId) return;

        const settingsDoc = doc(db, 'users', userId, 'settings', 'preferences');
        const docSnapshot = await getDoc(settingsDoc);

        if (docSnapshot.exists()) {
            autoFillMissingDays.value = docSnapshot.data().autoFillMissingDays ?? true;
        } else {
            messageStore.addMessage(1, { title: 'settings.settings_not_found' });
        }
    };

    const updateAutoFillDaysSetting = async (autoFillDays) => {
        const userId = authStore.user?.uid;

        if (!userId) return;

        const settingsDoc = doc(db, 'users', userId, 'settings', 'preferences');

        try {
            await setDoc(settingsDoc, { autoFillMissingDays: autoFillDays }, { merge: true });
            autoFillMissingDays.value = autoFillDays;
        } catch (error) {
            messageStore.addMessage(1, { title: 'settings.autolines_error: ' + error });
        }
    };

    return {
        autoFillMissingDays,
        fetchAutoFillLines,
        updateAutoFillDaysSetting,
    };
});
