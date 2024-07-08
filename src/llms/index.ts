


export enum AiState {
    /**
     * @description 工作中
     */
    working,

    /**
     * @description 回答完成
     */
    finish,

    /**
     * @description 出错
     */
    error,

    /**
     * @description 未开始
     */
    newborn
}
export interface OpenAiChatConfig {
    api_key: string
    baseurl: string
    model: string
}
export abstract class AiInteraction {
    readonly api_key: string
    readonly model: string
    readonly baseurl: string

    public state: AiState = AiState.newborn

    constructor(config: OpenAiChatConfig) {
        this.api_key = config.api_key
        this.model = config.model
        this.baseurl = config.baseurl
    }



    protected abstract send(prompt: string): any

    public input(prompt: string) {
        this.state = AiState.working
        return this.send(prompt)
    }

}