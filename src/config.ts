import { readFileSync } from "fs-extra"
import { ExtensionContext, workspace, WorkspaceConfiguration } from "vscode"

let config: WorkspaceConfiguration

export interface Config {
    apiKey?: string,
    model: string,
    baseurl?: string
}

export const load_config = function() {
    if (config) return 
    config = workspace.getConfiguration("gpt-simple")
}

/**
 * @description 配置 
 * @param key 
 * @returns 
 */
export const get_config = function<K extends keyof Config, T extends Config[K]>(key: K) {
    return config.get<T>(key)!
}