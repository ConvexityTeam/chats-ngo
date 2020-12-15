import Vue from 'vue';
const capitalize = (value) => {
    if (!value) return '';
    return value
        .split(' ')
        .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
        .join(' ');
}

Vue.filter('capitalize', capitalize)