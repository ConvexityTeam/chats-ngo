import Vue from "vue";
import Vuelidate from "vuelidate";
import JsonCSV from "vue-json-csv";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import vGoogleTranslate from "v-google-translate";

// import VueCryptojs from "vue-cryptojs";

/* This is r=to encrypt Data as referenced in Axios file */
// Vue.use(VueCryptojs);
Vue.component("downloadCsv", JsonCSV);
Vue.use(Vuelidate);
Vue.use(vGoogleTranslate);
Vue.use(VueTelInput, {
  mode: "international",
  validCharactersOnly: true,
  inputOptions: {
    autocomplete: "off",
  },
});
