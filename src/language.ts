import { env, ExtensionContext } from "vscode";
import { join } from "path";

export const set_language = function(context: ExtensionContext) {
    const vscode_language = env.language;
    const extensison_path = context.extensionPath;
    const nls_file_abs_path = join(extensison_path, "nls", vscode_language)
}