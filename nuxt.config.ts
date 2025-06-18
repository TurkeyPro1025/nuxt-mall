// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    devServer: {
        host: "192.168.14.29", //自己电脑的Ip
        port: 3000,
    },
    typescript: {
        strict: true,
        typeCheck: true,
    },
    css: ["~/assets/css/main.css"],
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    app: {
        head: {
            title: "原创商城",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "description", content: "基于Nuxt的原创商城项目" },
            ],
        },
    },
});
