
import { CommandAdapth } from "./lib"
import { logger } from "src/logger";
import { config } from "src/config";
import { CreateOpenAiChat } from "../llms/openai"
import { workspace } from "vscode";
import { create_temp_file, get_active_editor_info, set_document_content } from "src/lib/vscode";
export class CodeComment extends CommandAdapth {
    command_id: string = "dys.codeHelper";
    async invoke(...args: any[]) {

        const action_editor_info = get_active_editor_info()
        const temp_doc = await create_temp_file(action_editor_info)
        
        const ai = new CreateOpenAiChat(config)
        const promp = `请解释以下代码:
        ${action_editor_info.content}
        `
        const res = await ai.input(promp)
        for await (const str of res) {
            await set_document_content(temp_doc, str)
        }

    }
    
}
