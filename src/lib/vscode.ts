import { window, TextDocument, Uri, ViewColumn, workspace, WorkspaceEdit, Position } from "vscode"
import { join, parse, ParsedPath } from "path";


export type EditorInfo = {
    document: TextDocument,
    path: ParsedPath,
    content: string,
    language: string, 
}
export const get_active_editor_info = function(): EditorInfo {
    const active_editor = window.activeTextEditor
    if (!active_editor) throw new Error("error.404.active-editor")
    const document = active_editor.document
    document.languageId
    const selection = active_editor.selection
    
    return {
        document,
        path: parse(document.fileName),
        content: document.getText(selection.isEmpty ? void 0 : selection),
        language: document.languageId,
    }
}

export const create_temp_file = async function(exitor_info?: EditorInfo, open: boolean = true) {

    const uri = exitor_info 
        ? Uri.parse(`untitled:${join(exitor_info.path.dir, `${exitor_info.path.name}.temp${exitor_info.path.ext}`)}`)
        : Uri.parse(`untitled:untitled-1`);

    const document = await workspace.openTextDocument(uri);

    open && await window.showTextDocument(uri, { preview: false, viewColumn: ViewColumn.Beside });
    return document

}

export const set_document_content = function(document: TextDocument, content: string) {
    const edit = new WorkspaceEdit()
    edit.insert(document.uri, new Position(document.lineCount, 0), content)
    return workspace.applyEdit(edit)
}
