const { host, hostname } = window.location;
const localhost = hostname.includes("localhost");
const staging = localhost || hostname.includes("staging");

const stagingEnv = {
  APP_ENVIRONMENT: "staging",
  BASE_URL: "https://staging-api.chats.cash/v1/",
  HOST_URL: localhost ? `http://${host}` : "https://staging.chats.cash",
  PAYSTACK_KEY: "pk_test_8ca0b7e72a203c05be761cdf339747f8fcfbeaa7",
  NIN_KEY: "F4Unc5MZ.e7BjG09xd9YJXMnvuXmayuICfMVNW6OE",
  GOOGLE_API: "AIzaSyApnZ4U1qeeHgHZuckDndNVVMIJAo-b5Vo",
  DONOR_APP_URL: localhost
    ? "http://localhost:4000"
    : "https://staging-donor.chats.cash",
  RECAPTCHA_SITE_KEY: "",
};

const productionEnv = {
  APP_ENVIRONMENT: "production",
  BASE_URL: "https://api.chats.cash/v1/",
  HOST_URL: "https://dashboard.chats.cash",
  PAYSTACK_KEY: "pk_live_edacd8ac3c89064aacb7b901b0ebec088dfacf69",
  NIN_KEY: "F4Unc5MZ.e7BjG09xd9YJXMnvuXmayuICfMVNW6OE",
  GOOGLE_API: "AIzaSyAXAK5t4yAGczmh8vpeXevXwCHeOAw4w24",
  DONOR_APP_URL: "https://donor.chats.cash",
  RECAPTCHA_SITE_KEY: "",
};

export default staging ? stagingEnv : productionEnv;
