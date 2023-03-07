const BASE_URL = process.env.BASE_URL;

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

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

    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API}&libraries=geometry,drawing&v=weekly`,
      },
    ],
  },

  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],

  plugins: [
    "~/plugins/global.js",
    "~/plugins/index.js",
    "~/plugins/axios.js",
    "~/plugins/element-ui",
    // "~/plugins/freshdesk.js",
    { src: "~/plugins/vuex-persist", ssr: false },
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
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    version: 2,
    size: "invisible",
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: BASE_URL,
    https: true,
    progress: true,
    retry: { retries: 2 },
  },

  toast: {
    position: "top-right",
    duration: 3500,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    terser: {
      // https://github.com/terser/terser#compress-options
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
