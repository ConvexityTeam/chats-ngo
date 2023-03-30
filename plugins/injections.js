import countries from "./countries";
export default ({ app, store }, inject) => {
  // Currency Symbol  Here
  const user = store.getters["authentication/user"];
  const currencyCode = user?.currency || "NGN";

  const country = countries.find(
    (country) => country?.currencies[0]?.code === currencyCode
  );

  const currencySymbol = country
    ? country.currencies[0]?.symbol
    : country.currencies[0]?.code;

  //copy to clipboard
  const copy = (value) => {
    if (value.length) {
      navigator.clipboard.writeText(value);
      app.$toast.success("Copied to clipboard");
    }
    return;
  };

  // Truncate  text  Here
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
  inject("currency", currencySymbol);
  inject("truncate", truncate);
};
