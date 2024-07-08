import { readFileSync } from "fs-extra"
import { ExtensionContext, workspace, WorkspaceConfiguration } from "vscode"


export interface Config {
    apiKey?: string,
    model: string,
    baseurl?: string,
}


export class AppConfig implements Config {
    private _workspace_configuration: WorkspaceConfiguration
    private context: ExtensionContext
    static app_name: string = "gpt-simple"
    private _app_name = ""
    public get app_name() {
        return this._app_name
    }

    private _api_key: string = ""
    public get api_key() {
        if (this._api_key) return this._api_key
        return this._api_key = this._workspace_configuration.get<string>("apiKey")!
    }

    private _model: string = ""
    public get model() {
        if (this._model) return this._model
        return this._model = this._workspace_configuration.get<string>("model")!
    }

    private _baseurl: string = ""
    public get baseurl() {
        if (this._baseurl) return this._baseurl
        return this._baseurl = this._workspace_configuration.get<string>("baseurl")!
    }


    constructor(app_name: string = AppConfig.app_name,  context: ExtensionContext) {
        this._app_name = app_name
        this._workspace_configuration = workspace.getConfiguration(app_name)
        this.context = context
    }
}

export let config: AppConfig

export const init_config = (context: ExtensionContext, app_name?: string) => {
    config = new AppConfig(app_name, context)
}