// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "chats",
    reducer(val) {
      const token = !!sessionStorage.getItem("userToken");
      if (!token) {
        return {};
      }
      return val;
    },
  }).plugin(store);
};
