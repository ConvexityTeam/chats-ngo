import Vue from "vue";
import Vuelidate from "vuelidate";
import JsonCSV from "vue-json-csv";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import VueCryptojs from "vue-cryptojs";
import countries from "./countries";

Vue.use(VueCryptojs);

Vue.component("downloadCsv", JsonCSV);
Vue.use(Vuelidate);
Vue.use(VueTelInput, {
  mode: "international",
  validCharactersOnly: true,
  inputOptions: {
    autocomplete: "off",
  },
});

export default ({ app, store }, inject) => {
  /* Currency Symbol  Here */
  const user = store.getters["authentication/user"];
  const currencyCode = user?.currency || "NGN";

  const country = countries.find(
    (country) => country?.currencies[0]?.code === currencyCode
  );

  const currencySymbol = country
    ? country.currencies[0]?.symbol
    : country.currencies[0]?.code;

  /* Copy  text  Here */
  const copy = (value) => {
    if (value.length) {
      navigator.clipboard.writeText(value);
      app.$toast.success("Copied to clipboard");
    }
    return;
  };

  // Format Currency Input here

  const formatNumbers = (event, key, payload) => {
    console.log("event", event, "key", key, "payload", payload);
    console.log("app: ", app);

    event.target.type = "text";
    event.target.value = `${currencySymbol}${event.target.value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  inject("copy", copy);
  inject("currency", currencySymbol);
  inject("formatNumberss", formatNumbers);
};
