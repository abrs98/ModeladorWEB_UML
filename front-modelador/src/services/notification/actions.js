import * as T from '@services/notification/actionsTypes';

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: T.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: T.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: T.REMOVE_SNACKBAR,
  key,
});
