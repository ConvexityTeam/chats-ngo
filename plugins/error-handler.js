const showDefaultNotification = (message, app) => {
  app.$toast.error(message);
};

const showValidationNotification = (errors, title, app) => {
  const errorCount = Object.values(errors).length;

  if (errorCount < 1) {
    return showDefaultNotification(title, app);
  }

  const firstErrorValue = Object.values(errors)[0];
  const message = Array.isArray(firstErrorValue) ? firstErrorValue[0] : title;

  showDefaultNotification(message, app);
};

const errorHandler = (error, app) => {
  const data = error.response?.data || {};
  const { message } = data || "An Error Occured";
  const status = error.response?.status;

  switch (status) {
    // Handle validation errors
    case 422:
      console.log("VALIDATUON ERR:;;", data);
      showValidationNotification(data.errors || {}, message, app);
      break;

    // Any other generic notification
    default:
      showDefaultNotification(message, app);
  }
};

const errorHandlerPlugin = ({ app }, inject) => {
  inject("errorHandler", (error) => {
    errorHandler(error, app);
  });
};

export default errorHandlerPlugin;
