
import { logger } from "../logger";
import { AiInteraction, OpenAiChatConfig } from ".";
import { OpenAI } from "@langchain/openai"



export class CreateOpenAiChat extends AiInteraction {
  
    private openai: OpenAI
    constructor(config: OpenAiChatConfig) {
        
        super(config)
        this.openai = new OpenAI({
            apiKey: this.api_key,
            maxTokens: 5000,
            model: this.custom_model || this.model,
            configuration: {
                baseURL: this.baseurl,
            }
        })
    }

    protected send(prompt: string) {
        return this.openai.stream(prompt)
    }

}
