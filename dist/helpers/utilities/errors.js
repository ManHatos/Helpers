/** Custom error class with helpful additions */
export class Base extends Error {
    /** Error identifier */
    id;
    /** Error code name */
    name;
    /** User-facing and debug message */
    context;
    /** Emoji used for `context` */
    emoji = "⚠️";
    /** Exact location at which the error was thrown */
    at;
    constructor(error = {
        code: Codes.UNKNOWN,
        context: "An unknown error has occurred\nPlease try again shortly. If you continuously encounter such errors, please contact [Tycho](<https://discord.tychosystems.xyz>).",
    }) {
        super();
        this.id = crypto.randomUUID();
        error.code ??= Codes.UNKNOWN;
        this.name = Codes[error.code];
        if (error.emoji)
            this.emoji = error.emoji;
        this.context = (() => {
            const lines = error.context.split("\n");
            return (`### ${this.emoji} ${lines.shift()?.replace(/\.$/, "")}` +
                (lines.length === 0
                    ? ""
                    : "\n" + lines.map((line) => `-# ${line.replace(/(?<![\!\?])(\.|)$/, ".")}`).join("\n")));
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
/** Eror codes used for `BotError` handling */
export var Codes;
(function (Codes) {
    /** Unknown error */
    Codes[Codes["UNKNOWN"] = 0] = "UNKNOWN";
    /** The resource has expired */
    Codes[Codes["EXPIRED"] = 1] = "EXPIRED";
    /** Duplicate resource found */
    Codes[Codes["DUPLICATE"] = 2] = "DUPLICATE";
    /** Resource not found */
    Codes[Codes["NOT_FOUND"] = 3] = "NOT_FOUND";
    /** Operation not allowed */
    Codes[Codes["NOT_ALLOWED"] = 4] = "NOT_ALLOWED";
    /** Unauthorized access */
    Codes[Codes["UNAUTHORIZED"] = 5] = "UNAUTHORIZED";
    /** Invalid input or request */
    Codes[Codes["INVALID"] = 6] = "INVALID";
    /** Bad input or malformed request */
    Codes[Codes["BAD_REQUEST"] = 7] = "BAD_REQUEST";
    /** Unexpected internal error */
    Codes[Codes["INTERNAL"] = 8] = "INTERNAL";
    /** Request timed out */
    Codes[Codes["TIMEOUT"] = 9] = "TIMEOUT";
    /** Conflicting resource state */
    Codes[Codes["CONFLICT"] = 10] = "CONFLICT";
    /** Action is forbidden */
    Codes[Codes["FORBIDDEN"] = 11] = "FORBIDDEN";
    /** Resource is rate limited */
    Codes[Codes["TOO_MANY_REQUESTS"] = 12] = "TOO_MANY_REQUESTS";
    /** External unknown error */
    Codes[Codes["EXTERNAL"] = 13] = "EXTERNAL";
})(Codes || (Codes = {}));
