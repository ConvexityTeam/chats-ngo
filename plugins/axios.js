// var CryptoJS = require("crypto-js");

export default async function ({ $axios, app }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem("userToken");
    const identityPay = config.url.includes("myidentitypay");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (identityPay) {
      delete config.headers["Authorization"];
      config.headers["x-api-key"] = process.env.NIN_KEY;
    }
  });

  $axios.onResponse((response) => {
    // Extra check for pagination
    const { data } = response;
    const { totalPages, totalItems, currentPage } = data?.data;

    if (totalPages) {
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

  $axios.onError((err) => {
    console.log("error:::", err);
    const paths = ["/"];

    // !app.router.history.current.path == "/"

    if (err.response?.status == 401) {
      console.log("FAILED", { err });
      // app.$toast.error(err.response?.data?.message);
      return app.router.push("/");
    }
    return;
  });
}
