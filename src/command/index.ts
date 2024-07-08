import { commands, ExtensionContext, window, Disposable } from "vscode";
import { CodeComment } from "./code";
import { logger } from "../logger";




export const registry_commands = function(context: ExtensionContext) {
    new CodeComment(context).register()
}
