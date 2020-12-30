import Vue from 'vue';
const capitalize = (value) => {
    if (!value) return '';
    return value
        .split(' ')
        .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
        .join(' ');
}

const formatDateOnly = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hours = date.getHours();
    let mins = date.getMinutes();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (mins < 10) {
        mins = '0' + mins;
    }

    return date.toDateString();
};
Vue.filter('capitalize', capitalize)
Vue.filter('formatDateOnly', formatDateOnly)