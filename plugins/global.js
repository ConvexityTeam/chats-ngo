import Vue from "vue";
import moment from "moment";
const capitalize = value => {
    if (!value) return "";
    return value
        .split(" ")
        .map(val => val.charAt(0).toUpperCase() + val.slice(1))
        .join(" ");
};

const formatDateOnly = value => {
    if (!value) return "";
    return moment().format("DD/MM/YYYY");
};

const formatNumber = value => {
    if (value !== null) {
        return value
            .toString()
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return 0;
};
Vue.filter("capitalize", capitalize);
Vue.filter("formatDateOnly", formatDateOnly);
Vue.filter("formatNumber", formatNumber);