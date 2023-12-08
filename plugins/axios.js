// var CryptoJS = require("crypto-js");
import appConfig from "~/appConfig";
export default function ({ $axios, app }) {
  $axios.defaults.baseURL = appConfig.BASE_URL;
  $axios.onRequest((config) => {
    const token = sessionStorage.getItem("userToken");
    const identityPay = config.url.includes("myidentitypay");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (identityPay) {
      delete config.headers.Authorization;
      config.headers["x-api-key"] = appConfig.NIN_KEY;
    }
  });

  $axios.onResponse((response) => {
    const { data, config } = response;

    // const isPaginated = Object.prototype.hasOwnProperty.call(
    //   data?.data,
    //   "currentPage"
    // );

    // eslint-disable-next-line no-prototype-builtins
    const isPaginated = data?.data?.hasOwnProperty("currentPage");

    // specifically for NIN
    if (config.url.includes("myidentitypay")) {
      return response.data;
    }

    // Extra check for pagination
    if (isPaginated) {
      const { totalPages, totalItems, currentPage } = data.data;

      return {
        data: data?.data?.data || [],
        totalPages,
        totalItems,
        currentPage,
        status: data.status,
        code: data.code,
      };
    }

    return response.data;
  });

  $axios.onError((error) => {
    // if error has to be handled in the main code, handleError would be passed in the config as false
    if (
      Object.prototype.hasOwnProperty.call(error.config, "handleError") &&
      !error?.config?.handleError
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      sessionStorage.removeItem("userToken");
      app.router.push("/");
    }

    console.log("Got here", app);
    return app.$errorHandler(error);
  });
}
