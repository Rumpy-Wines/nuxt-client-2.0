export default {
    fetchOnServer: false,
    server: {
        host: '0.0.0.0',
        port: '4000'
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    env: {
        API_URL: process.env.API_URL
    },
    head: {
        title: 'rumpy',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/icon.png' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css' },
        ],
        script: []
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~assets/styles/style.scss',
        '~assets/styles/loading-animation.scss'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/format-price.js',
        '~/plugins/axios-accessor.ts',
        '~/plugins/vue-toast-notification.js',
        '~/plugins/offline-cart.client.js',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    auth: {
        // redirect: {
        //     login: '/login',
        //     logout: '/',
        //     callback: '/login',
        //     home: '/'
        // },
        watchLoggedIn: false,
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/auth/authenticate', method: 'post', propertyName: 'jwt' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/auth/user', method: 'get', propertyName: '' }
                },
                // tokenRequired: true,
                tokenType: 'Bearer',
                // globalToken: true,
                // autoFetchUser: true
            }
        }
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.API_URL
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {}
}