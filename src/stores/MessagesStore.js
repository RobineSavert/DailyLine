import { defineStore } from 'pinia';


export const useMessageStore = defineStore('messages', {
    state: () => ({
        alerts: [],
        toasts: []
    }),

    actions: {
        removeAlert() {
            this.alerts.splice(0, 1);
        },
        removeToast() {
            this.toasts.splice(0, 1);
        },

        //cant use an enum, because it requires a TS file.
        //0 == toast
        //1 == alert
        addMessage(messageType, message) {
            if(messageType == 0)
            {
                this.toasts.push(message);

                setTimeout(() => {
                    this.removeToast();
                }, 3000);
            }else if(messageType == 1){
                this.alerts.push(message);
                setTimeout(() => {
                    this.removeAlert();
                }, 5000);
            }
        },
    },
});
