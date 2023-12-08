module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended", "prettier"],
  plugins: ["jest"],
  // add your custom rules here
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "off",
    camelcase: "off",
    "no-console": "off",
  },
};
