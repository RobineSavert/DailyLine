import { defineStore } from 'pinia';


export const useMessageStore = defineStore('messages', {
  state: () => ({
    alerts: []
  }),

  actions: {
    removeAlert() {
      this.alerts.splice(0, 1);
    },

    addMessage(message) {
        this.alerts.push(message);
        setTimeout(() => {
          this.removeAlert();
        }, 5000);
    },
  },
});
