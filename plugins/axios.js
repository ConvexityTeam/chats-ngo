// var CryptoJS = require("crypto-js");
import appConfig from "~/appConfig";
export default async function ({ $axios, app }) {
  $axios.defaults.baseURL = appConfig.BASE_URL;
  $axios.onRequest((config) => {
    const token = localStorage.getItem("userToken");
    const identityPay = config.url.includes("myidentitypay");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (identityPay) {
      delete config.headers["Authorization"];
      config.headers["x-api-key"] = appConfig.NIN_KEY;
    }
  });

  $axios.onResponse((response) => {
    const { data, config } = response;
    // specifically for NIN
    if (config.url.includes("myidentitypay")) {
      return response.data;
    }

    console.log("response:::", response), console.log("data:::", data);

    // Extra check for pagination

    if (data) {
      const { totalPages, totalItems, currentPage } = data?.data || {};

      if (totalItems || totalPages) {
        return {
          data: data?.data?.data || [],
          totalPages,
          totalItems,
          currentPage,
          status: data.status,
          code: data.code,
        };
      }
    }

    return response.data;
  });

  $axios.onError((err) => {
    console.log("error:::", err);

    if (err.response?.status == 401) {
      console.log("FAILED", { err });
      return app.router.push("/");
    }
    // TODO: add errror hanler here
    return;
  });
}
