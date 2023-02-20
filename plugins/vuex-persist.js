import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "chats",
    reducer(val) {
      if (!val.authentication.token) {
        return {};
      }
      return val;
    },
  }).plugin(store);
};
