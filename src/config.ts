import { readFileSync } from "fs-extra"
import { ConfigurationChangeEvent, ExtensionContext, workspace, WorkspaceConfiguration } from "vscode"
import { logger } from "./logger"


export interface Config {
    api_key?: string,
    model: string,
    baseurl?: string,
    custom_model?: string,
}


export class AppConfig implements Config {
    private workspace_configuration: WorkspaceConfiguration
    private context: ExtensionContext
    static app_name: string = "gpt-simple"
    private _app_name = ""
    public get app_name() {
        return this._app_name
    }

    private _api_key: string = ""
    public get api_key() {
        return this.config_getter("api_key", "apiKey")
    }

    private _model: string = ""
    public get model() {
        return this.config_getter("model")
    }

    private _custom_model: string = ""
    public get custom_model() {
        return this.config_getter("custom_model")
    }

    private _baseurl: string = ""
    public get baseurl() {
        return this.config_getter("baseurl")
    }

    constructor(app_name: string = AppConfig.app_name,  context: ExtensionContext) {
        this._app_name = app_name
        this.workspace_configuration = workspace.getConfiguration(app_name)
        this.context = context
        this.listener_config()
    }

    private config_getter(key: keyof Config, config_key?: string): string {
        const _key = "_" + key as keyof this
        if (this[_key]) return <string>this[_key]
        const inspect = this.workspace_configuration.inspect<string>(config_key || key)
        // @ts-ignore
        return this[_key] = inspect?.workspaceValue || inspect?.workspaceFolderValue || inspect?.globalValue || inspect?.defaultValue || ""
    }

    private reset_config() {
        this._api_key = ""
        this._model = ""
        this._custom_model = ""
        this._baseurl = ""
    }

    private listener_config() {
        workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if(!event.affectsConfiguration(this.app_name)) return
            this.reset_config()
        })
    }

}

export let config: AppConfig

export const init_config = (context: ExtensionContext, app_name?: string) => {
    config = new AppConfig(app_name, context)
}