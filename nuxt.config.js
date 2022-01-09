const BASE_URL = 'https://api.chats.cash/v1/';
const apiKey = process.env.GOOGLE_API;
export default {
	// Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
	ssr: false,

	head: {
		title: 'frontend-ngo-web',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

			{
				rel: 'stylesheet',
				href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
			},
		],
		script: [
			{
				src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry,drawing&v=weekly`,
			},
		],
	},

	css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],

	plugins: [
		'~/plugins/global.js',
		'~/plugins/index.js',
		'~/plugins/axios.js',
		'~/plugins/element-ui',
		// "~/plugins/freshdesk.js",
		{ src: '~/plugins/vuex-persist', ssr: false },
		'~/plugins/copy-to-clip.js',
	],

	components: true,

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/axios',
		'@nuxtjs/toast',
		'@nuxtjs/dotenv',
	],

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {
		baseURL: BASE_URL,
		https: true,
		progress: true,
		retry: { retries: 2 },
	},

	toast: {
		position: 'top-right',
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
	},
};
