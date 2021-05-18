import Vue from 'vue'
import Vuelidate from 'vuelidate'
import JsonCSV from "vue-json-csv";
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import Flutterwave from  'flutterwave-vue-v3'

Vue.use(Flutterwave, { publicKey: 'FLWPUBK_TEST-fc8b47805612f00062c35391c6c11cf4-X' } )

Vue.component("downloadCsv", JsonCSV);
Vue.use(Vuelidate)
Vue.use(VueTelInput)