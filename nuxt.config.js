export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    head: {
        title: 'frontend-ngo-web',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
        '~/assets/css/main.css',
        '~/assets/css/fonts.css'
    ],

    plugins: [
        '~/plugins/global.js',
    ],
    loading: {
        color: ' #17CE89',
        name: 'fading-circle',
        continuous: true,
        duration: 1200,
    },

    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/toast',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},
    toast: {
        position: 'top-right',
        duration: 10000
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {}
}