import Vue from 'vue'
import Vuelidate from 'vuelidate'
import JsonCSV from "vue-json-csv";
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import Flutterwave from  'flutterwave-vue-v3'

Vue.use(Flutterwave, { publicKey: 'FLWPUBK-61c369ab116e10e9bef18096a2f916ed-X' } )

Vue.component("downloadCsv", JsonCSV);
Vue.use(Vuelidate)
Vue.use(VueTelInput)