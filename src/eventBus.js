import { reactive, markRaw } from 'vue';

const state = reactive({
  showModal: false,
  modalTitle: '',
  modalBodyComponent: null,
  modalBodyProps: null,
  modalBodyText: '',
  modalSize: '',
  modalFullScreen: false,
  modalButton: null,
  modalButtonText: '',
  modalButtonIcon: '',
  modalButtonCallback: null,
  modalButtonDisabled: true, // Default to true (button disabled by default)
});

const showModal = (title, body, bodyProps, buttonText, size = '', fullScreen = false, isBodyText = false, isButtonText = false, buttonIcon = '', buttonCallback = null, buttonDisabled = true) => {
  state.modalTitle = title;

  if (isBodyText) {
    state.modalBodyComponent = null;
    state.modalBodyText = body;
  } else {
    state.modalBodyComponent = markRaw(body);
    state.modalBodyProps = bodyProps;
    state.modalBodyText = '';
  }

  if (isButtonText) {
    state.modalButton = null;
    state.modalButtonText = buttonText;
  } else {
    state.modalButton = buttonText;
    state.modalButtonText = '';
  }

  state.modalSize = size;
  state.modalFullScreen = fullScreen;
  state.showModal = true;
  state.modalButtonIcon = buttonIcon;
  state.modalButtonCallback = buttonCallback;
  state.modalButtonDisabled = buttonDisabled; // Set buttonDisabled state
};

const hideModal = () => {
  state.showModal = false;
  state.modalButtonIcon = '';
  state.modalButtonCallback = null;
  state.modalButtonDisabled = true; // Reset to true
};

export default {
  state,
  showModal,
  hideModal,
};
