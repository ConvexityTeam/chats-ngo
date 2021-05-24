var CryptoJS = require("crypto-js");
export default async function({ $axios, app }) {
  $axios.onRequest(config => {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  });

  $axios.onResponse(response => {
    console.log("Response:::", response);

    const decrypted = CryptoJS.AES.decrypt(
      response.data,
      "PO#64a978c028JA68c40182#!UAOENL#c22eaSNLSJFLJFSD@#31d740239c6243+*9c62439c6b1d41d7402"
    ).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  });

  $axios.onError(err => {
    console.log("error:::", err);

    if (err.response.status == "401") {
      app.router.push('/login')
    }

    const decrypted = CryptoJS.AES.decrypt(
      err.response.data,
      "PO#64a978c028JA68c40182#!UAOENL#c22eaSNLSJFLJFSD@#31d740239c6243+*9c62439c6b1d41d7402"
    ).toString(CryptoJS.enc.Utf8);

    const data = JSON.parse(decrypted);

    return data;
  });
}
