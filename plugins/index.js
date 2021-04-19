import Vue from 'vue'
import Vuelidate from 'vuelidate'
import JsonCSV from "vue-json-csv";
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'

Vue.component("downloadCsv", JsonCSV);
Vue.use(Vuelidate)
Vue.use(VueTelInput)