declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development"|"production";
        http_proxy?: string
        https_proxy?: string
        all_proxy?: string
        HTTP_PROXY?: string
        HTTPS_PROXY?: string
        ALL_PROXY?: string
    }
}