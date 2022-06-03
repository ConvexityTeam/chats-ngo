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
    autocomplete: "off"
  }
});

export default ({ app, store }, inject) => {
  const user = store.getters["authentication/user"];
  const currencyCode = user?.currency || "NGN";

  const country = countries.find(
    country => country?.currencies[0]?.code === currencyCode
  );

  const currencySymbol = country
    ? country.currencies[0]?.symbol
    : country.currencies[0]?.code;

  inject("currency", currencySymbol);
};

// if (payload) {
//   if (this.$v.payload[key]) {
//     this.$v.payload[key].$touch();
//   }
//   e.target.type = "text";
//   this.payload[key] =
//     "$ " +
//     new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(this.payload[key]);
// }
