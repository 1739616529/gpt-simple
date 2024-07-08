
import { CommandAdapth } from "./lib"
import { logger } from "src/logger";
import { config } from "src/config";
import { CreateOpenAiChat } from "../llms/openai"
export class CodeComment extends CommandAdapth {
    command_id: string = "dys.showDialog";
    async invoke(...args: any[]) {
        const ai = new CreateOpenAiChat({
            api_key: config.api_key,
            baseurl: config.baseurl,
            model: config.model
        })
        const res = await ai.input("你好请介绍一下自己")
        for await (const str of res) {
            console.log(str);
        }

    }
    
}
