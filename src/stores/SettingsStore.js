import { defineStore } from 'pinia';
import { db } from '../js/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuthStore } from "@/stores/AuthStore";
import {useMessageStore} from "@/stores/MessagesStore";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        autoFillMissingDays: true,  // Default value, will be loaded from the database
    }),
    actions: {
        async fetchAutoFillLines() {
            const authStore = useAuthStore();
            const userId = authStore.user?.uid;
            const messageStore = useMessageStore();

            if (!userId) return;

            const settingsDoc = doc(db, "users", userId, "settings", "preferences");
            const docSnapshot = await getDoc(settingsDoc);

            if (docSnapshot.exists()) {
                // Load the value from Firestore, or use the default if not set
                this.autoFillMissingDays = docSnapshot.data().autoFillMissingDays ?? true;
            } else {
                messageStore.addMessage(1, { title: 'settings.settings_not_found' });
            }
        },

        async updateAutoFillDaysSetting(autoFillDays) {
            const authStore = useAuthStore();
            const userId = authStore.user?.uid;
            const messageStore = useMessageStore();

            if (!userId) return;
            const settingsDoc = doc(db, "users", userId, "settings", "preferences");

            try {
                await setDoc(settingsDoc, { autoFillMissingDays: autoFillDays }, { merge: true });
                this.autoFillMissingDays = autoFillDays;
            } catch (error) {
                messageStore.addMessage(1, { title: 'settings.autolines_error: ' + error });
            }
        }
    }
});
