/** Custom error class with helpful additions */
export class AppError extends Error {
    /** Error identifier */
    id;
    /** Error code name */
    code;
    /** User-facing and debug message */
    context;
    /** Emoji used for `context` */
    emoji = "⚠️";
    /** Exact location at which the error was thrown */
    at;
    constructor(error = {
        code: "UNKNOWN",
        context: "An unknown error has occurred\n%d",
    }) {
        super();
        this.id = crypto.randomUUID();
        error.code ??= "UNKNOWN";
        this.code = error.code;
        if (error.emoji)
            this.emoji = error.emoji;
        this.context = (() => {
            const lines = error.context.split("\n");
            return (`### ${this.emoji} ${lines.shift()?.replace(/\.$/, "")}` +
                (lines.length === 0
                    ? ""
                    : "\n" +
                        lines
                            .map((line) => `-# ${line
                            .replaceAll(/(?<!\\)\%d/g, "Please try again shortly. If you continuously encounter such errors, please contact [Tycho](<https://discord.tychosystems.xyz>).")
                            .replace(/(?<![\!\?])(\.|)$/, ".")}`)
                            .join("\n")));
        })();
        this.at = this.path(this.stack); // extract path from stack
        this.message = "";
        this.stack = "";
    }
    path(stack) {
        if (stack) {
            const lines = stack.split("\n");
            if (lines?.[1]) {
                return lines[1].match(/(?<=^.+at ).+/)?.[0];
            }
        }
    }
    is(id) {
        return this.id == id;
    }
}
