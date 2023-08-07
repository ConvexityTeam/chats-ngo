export default ({ app, store }, inject) => {
  const onRouteChange = () => {
    const { user } = store.state?.authentication || {};
    const { currencySymbol, currencyCode } = user?.currencyData || {};
    const displaySymbol = currencySymbol || currencyCode || "";

    inject("currency", displaySymbol);
  };

  // Run the plugin on initial load
  onRouteChange();

  // Listen for route changes and run the plugin again
  // This ensures that the plugin runs after the user object is set in the store
  app.router.beforeResolve((to, from, next) => {
    onRouteChange();
    next();
  });

  /*copy to clipboard */
  const copy = (value) => {
    if (value.length) {
      navigator.clipboard.writeText(value);
      app.$toast.success("Copied to clipboard");
    }
    return;
  };

  /*Truncate  text  Here*/
  const truncate = (value, length = 13) => {
    if (value) {
      if (value.length > length) {
        return value.substring(0, length) + "...";
      }
      return value;
    }
    return;
  };

  inject("copy", copy);
  inject("truncate", truncate);
};
