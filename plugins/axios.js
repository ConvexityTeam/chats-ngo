var CryptoJS = require("crypto-js");

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

    // const encrypted = CryptoJS.AES.encrypt(
    //   JSON.stringify(config.data),
    //   "PO#64a978c028JA68c40182#!UAOENL#c22eaSNLSJFLJFSD@#31d740239c6243+*9c62439c6b1d41d7402"
    // ).toString();

    // return config.data = encrypted

    // console.log("config:::", config.data)
  });

  $axios.onResponse((response) => {
    return response.data;

    // const crypt = new JSEncrypt();
    // crypt.setPrivateKey(privateKey);

    // const decrypted = crypt.decrypt(response.data);

    // return JSON.parse(decrypted)

    // const decrypted = CryptoJS.AES.decrypt(
    //   response.data,
    // "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnqwBnZRMzQbrLWylG8IIF6CMoj9TUC2qXqXKW01H8CO7kAScPqHn/Earkcid8c5LrNGygjCcIJ1909mwyvqJEgDdLGKazHzfvKOTTwuuqlk73Am7pmQJUjyQZ/yB/jG90WTISRpu+GXLlIZGwJ+F1eUQlvnsqot3pq2KYoa9xkjfpP2hIj6x5F1PnZdSbgq6g08o5gWKe6lAdkXvET8sFhjQwe4CnU6DwPOrW5IzW8fUQYEBvfi4A4Qx1ppTJ+6Gxfs6Dc+aEvr4vTtGDD8He+oEYV5AnO/ZHLucPYrHhsujgHdznbdEiQxtxaP4QEXT1afESDMANawbx4XHcqXavGxjcSdpQGKAEu/hjwV6doarQsMeDtqxpYUARkUtuvpHbDuTnfoLamurGBdq1Ysz/hlfGBdM2D8d3+BSlwwIx3ofMTUWPpXQ4a2YBCt3myiy9V0NUXMfddSqhJXKIoKc3yGEpxrOEix8PbkckU62UIAn6xBch5vbCBmciQ6LzqRAe8V5E8xNoYuhlK/xYjTiVbniRH5cf0bNSmtEv7hK56PXjh1Y2LxMwjTr6lTM9yVlh/aAGdf0D5Cyz4BNweji/ecfTZDEN74a0eWOwhLPFInTNSH6jKHY9QTU30WhoDo1JVywJFxtXvKoV+aeS6ZBxrNNwVtON2ka2pP3HXrfQsMCAwEAAQ=="
    // ).toString(CryptoJS.enc.Utf8);

    // return JSON.parse(decrypted);
  });

  $axios.onError((err) => {
    console.log("error:::", err);

    // const crypt = new JSEncrypt();
    // crypt.setPrivateKey(privateKey);

    // const decrypted = crypt.decrypt(err.response.data);

    // return JSON.parse(decrypted)

    // const decrypted = CryptoJS.AES.decrypt(
    //   err.response.data,
    //  privateKey
    // ).toString(CryptoJS.enc.Utf8);

    // const data = JSON.parse(decrypted);
    const paths = ["/"];

    // &&
    // !app.router.history.current.path == "/"

    if (err.response?.status == 401) {
      console.log("FAILED", { err });
      // app.$toast.error(err.response?.data?.message);
      return app.router.push("/");
    }
    return;
  });
}
