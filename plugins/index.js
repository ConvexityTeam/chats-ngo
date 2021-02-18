import Vue from 'vue'
import Vuelidate from 'vuelidate'
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);
Vue.use(Vuelidate)