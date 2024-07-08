import { setGlobalDispatcher, ProxyAgent } from "undici"
import { bootstrap } from "global-agent"
import { logger } from "./logger"
import { getProxySettings, getEnvProxy } from "get-proxy-settings"

/**
 * @description 根据 env 获取 proxy uri
 * @returns 
 */
export const get_proxy_uri = async function(): Promise<string|undefined> {
    return getEnvProxy()?.https?.toString() || (await getProxySettings())?.https?.toString()
}

/**
 * @description 设置 代理
 * @param uri 
 */
export const set_app_proxy = function(uri: string) {
    const proxy = new ProxyAgent(uri)
    setGlobalDispatcher(proxy)
    bootstrap()
}

/**
 * @description 添加代理
 * @returns 
 */
export const set_proxy = async function() {
    const proxy_uri = await get_proxy_uri()
    if (!proxy_uri) return
    set_app_proxy(proxy_uri)
    logger.info("set proxy:", proxy_uri)
}