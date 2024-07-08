
import { CommandAdapth } from "./lib"
import { logger } from "src/logger";
import { get_config } from "src/config";

export class CodeComment extends CommandAdapth {
    command_id: string = "dys.showDialog";
    async invoke(...args: any[]) {
        logger.debug(get_config("model"))
    }
    
}
