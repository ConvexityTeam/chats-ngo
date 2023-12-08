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

// const formatCurrency = (value) => {
//   console.log("VUEWW", authentication);

//   if (value) {
//     let val = (value / 1).toFixed(2).replace(".", ".");
//     return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }
//   return "0.00";
// };

const formatCurrency = (value, store) => {
  const displaySymbol = store.$currency;
  const { user } = store.state.authentication || {};
  const { currencyData } = user || {};
  const { currencyCode, rate, usdBase } = currencyData || {};

  if (value && (currencyCode === "NGN" || !currencyCode)) {
    const val = (value / 1).toFixed(2).replace(".", ".");
    return `${displaySymbol}${val
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else if (value && rate && usdBase) {
    const convertedValue = (value / usdBase) * rate;
    const formattedValue = convertedValue.toFixed(2).replace(".", ".");
    return ` ${displaySymbol}${formattedValue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  return `${displaySymbol}0.00`;
};

const formatCount = (value) => {
  if (value) {
    const val = (value / 1).toFixed().replace(".", ".");
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
Vue.filter("formatCount", formatCount);
Vue.filter("formatDateText", formatDateText);
Vue.filter("shortDate", shortDate);
Vue.filter("formatDateTime", formatDateTime);

export default ({ store }) => {
  Vue.filter("formatCurrency", (value) => {
    return formatCurrency(value, store);
  });
};
