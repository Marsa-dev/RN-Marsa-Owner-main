import { showMessage, hideMessage } from 'react-native-flash-message';

export const showWarning = msg => {
  showMessage({
    message: msg,
    type: 'warning',
    floating: true,
    style: {
      zIndex: 1000,
    },
  });
};
export const showDanger = msg => {
  showMessage({
    message: msg,
    type: 'danger',
    floating: true,
    style: {
      zIndex: 1000,
    },
  });
};
export const showInfo = msg => {
  showMessage({
    message: msg,
    type: 'info',
    floating: true,
    style: {
      zIndex: 1000,
    },
  });
};
export const showSuccess = msg => {
  showMessage({
    message: msg,
    type: 'success',
    floating: true,
    style: {
      zIndex: 1000,
    },
  });
};
