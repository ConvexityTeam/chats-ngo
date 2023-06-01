const staging =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("staging");

const stagingEnv = {
  APP_ENVIRONMENT: "staging",
  BASE_URL: "https://staging-api.chats.cash/v1/",
  HOST_URL: "https://staging.chats.cash",
};

const productionEnv = {
  APP_ENVIRONMENT: "production",
  BASE_URL: "https://api.chats.cash/v1/",
  HOST_URL: "https://chats.cash",
};

export default staging ? stagingEnv : productionEnv;
