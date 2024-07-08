
import { AiInteraction, OpenAiChatConfig } from ".";
import { OpenAI } from "@langchain/openai"



export class CreateOpenAiChat extends AiInteraction {
  
    private openai: OpenAI
    constructor(config: OpenAiChatConfig) {
        super(config)
        this.openai = new OpenAI({
            apiKey: this.api_key,
            configuration: {
                baseURL: this.baseurl
            }
        })
    }

    // @ts-ignore
    protected send(prompt: string) {
        return this.openai.stream(prompt)
    }
}
