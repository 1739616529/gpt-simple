import { ExtensionContext, commands, window } from "vscode";
import { logger } from "../logger";
export abstract class CommandAdapth {
    protected context: ExtensionContext;
    abstract command_id: string;

    constructor(context: ExtensionContext) {
        this.context = context;
    }

    public register() {
        logger.info(`[registry command]: ${this.command_id}`);
        const dispose = commands.registerCommand(
            this.command_id,
            this.execute.bind(this)
        );
        this.context.subscriptions.push(dispose);
    }
    abstract invoke(...args: any[]): Promise<void>;
    private execute(...args: any[]) {
        this.invoke(...args).catch((err) => {
            logger.error(err)
        });
    }
}
