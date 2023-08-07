import Vue from "vue";

// Custom directive to disable the wheel event on input of type "number"
Vue.directive("disable-wheel", {
  // Directive lifecycle hook: inserted
  // This will be called when the bound element is inserted into the DOM
  inserted(el) {
    // Prevent the wheel event and stop its propagation
    el.addEventListener("wheel", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  },
});
