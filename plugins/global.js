import Vue from "vue";
import moment from "moment";
const capitalize = (value) => {
  if (value) {
    return value
      .split(" ")
      .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
      .join(" ");
  }
  return "";
};
const formatDateOnly = (value) => {
  if (!value) return "";
  return moment(value).format("DD/MM/YYYY");
};
const formatDateText = (value) => {
  if (!value) return "";
  return moment(value).format(" dddd, MMMM DD, YYYY ");
};
const formatDate = (value) => {
  if (!value) return "";
  return moment(value).format("DD MMMM, YYYY ");
};
const shortDate = (value) => {
  if (!value) return "";
  return moment(value).format("DD MMM, YYYY ");
};
const formatNumber = (value) => {
  if (value) {
    return value
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
};
const formatCurrency = (value) => {
  if (value) {
    let val = (value / 1).toFixed(2).replace(".", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0.00";
};

const formatCount = (value) => {
  if (value) {
    let val = (value / 1).toFixed().replace(".", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
};

function formatDateTime(value) {
  if (value) return moment(value).format("DD MMM, YYYY HH:mm:ss");
  return "";
}

Vue.filter("capitalize", capitalize);
Vue.filter("formatDateOnly", formatDateOnly);
Vue.filter("formatDate", formatDate);
Vue.filter("formatNumber", formatNumber);
Vue.filter("formatCurrency", formatCurrency);
Vue.filter("formatCount", formatCount);
Vue.filter("formatDateText", formatDateText);
Vue.filter("shortDate", shortDate);
Vue.filter("formatDateTime", formatDateTime);
