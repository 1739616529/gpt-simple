import { ExtensionContext, commands, window } from "vscode"
import { logger } from "./logger"
import { registry_commands } from "./command"
import { load_config } from "./config"
import { set_proxy } from "./proxy"

export const activate = async function(context: ExtensionContext) {
    logger.info("extension activate")

    try {

        // 加载配置
        load_config()  
        
        // 设置软件代理
        await Promise.all([set_proxy()])


        // 注册 命令
        registry_commands(context)

      


    } catch (err) {
        window.showInformationMessage(<string>err)
        logger.error(err)
    }
}
