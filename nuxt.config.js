export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  target: "static",

  head: {
    title: "Convexity Humanitarian Aids Transfer Solution - CHATS",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        hid: "description",
        content: "Dignifying Cash Voucher Assistance using the Blockchain",
      },

      { name: "og:url", hid: "og-url", content: "" },
      { name: "og:title", hid: "og-title", content: "" },
      { name: "og:type", hid: "og-type", content: "" },
      {
        name: "og:description",
        hid: "og-description",
        content: "Dignifying Cash Voucher Assistance using the Blockchain",
      },
      // { name: "og:image", hid: "og-image", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

      {
        rel: "stylesheet",
        href: "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
      },
    ],

    // TODO:// Move this to the component
    // script: [
    //   {
    //     src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API}&libraries=geometry,drawing&v=weekly`,
    //   },
    // ],
  },

  css: ["~/assets/css/main", "~/assets/css/fonts.css"],

  plugins: [
    "~/plugins/global.js",
    "~/plugins/index.js",
    "~/plugins/axios.js",
    "~/plugins/injections.js",
    "~/plugins/element-ui",
    // "~/plugins/freshdesk.js",
    { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/directives.js", mode: "client" },
  ],

  components: true,

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "@nuxtjs/dotenv",
    "@nuxtjs/i18n",
    "@nuxtjs/recaptcha",
  ],

  recaptcha: {
    hideBadge: true,
    siteKey: "6LfTztoiAAAAAOZkIuu4K0ACK8B6p9DrEJzeuPmd",
    version: 2,
    size: "invisible",
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    https: true,
    progress: false,
    retry: { retries: 2 },
  },

  toast: {
    position: "top-right",
    duration: 3500,
  },

  build: {
    transpile: [/^element-ui/],
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
  },
};
