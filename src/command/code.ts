
import { CommandAdapth } from "./lib"
import { logger } from "../logger";
import { config } from "../config";
import { CreateOpenAiChat } from "../llms/openai"
import { workspace } from "vscode";
import { create_temp_file, get_active_editor_info, set_document_content } from "../lib/vscode";
import { env } from "vscode"
export class CodeComment extends CommandAdapth {
    command_id: string = "dys.codeHelper";
    async invoke(...args: any[]) {

        const action_editor_info = get_active_editor_info()
        const temp_doc = await create_temp_file(action_editor_info)
        
        logger.info(`Using OpenAI model ${config.custom_model || config.model}`)
        const ai = new CreateOpenAiChat(config)
        const promp = `You are a programming language commentator.\nYou need to help me add comments to #{sourceLanguage} code as much as possible to make it readable for beginners.\nDo not change the original code, just add as detailed comments as possible,\nbecause my purpose is only to understand and read. Please use my native language #{locale} as the commenting language.\nPlease do not reply with any text other than the code, and do not use markdown syntax.\nHere is the code you need to comment on:\n\n#{content}
        `.replace("#{sourceLanguage}", action_editor_info.language).replace("#{content}", action_editor_info.content).replace("#{locale}", env.language)
        const res = await ai.input(promp)
        for await (const str of res) {
            await set_document_content(temp_doc, str)
        }

    }
    
}
