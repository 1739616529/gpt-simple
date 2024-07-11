import { defineConfig, Options } from "tsup"
import { builtinModules } from "module"


export default defineConfig((options: Options) => {


    return {
        entry: [
            "src/index.ts",
            "src/llms/*.ts",
        ],

        format: ["cjs"],
        clean: true,
        minify: options.watch ? false : true,
        sourcemap: options.watch ? true : false,
        target: "es2018",
        esbuildOptions(option, context) {
            option.external = [
                "vscode",
                
                ...builtinModules.map((m) => `^${m}$`),
                ...builtinModules.map((m) => `^node:${m}$`),
            ]
        }
    }
})