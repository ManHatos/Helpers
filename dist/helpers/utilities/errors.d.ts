/** Custom error class with helpful additions */
export declare class AppError extends Error {
    /** Error identifier */
    id: string;
    /** Error code name */
    code: Codes;
    /** User-facing and debug message */
    context: string;
    /** Emoji used for `context` */
    private emoji;
    /** Exact location at which the error was thrown */
    at?: string;
    constructor(error?: {
        /** Error code for quick diagnosis */
        code?: Codes;
        /** User-facing and debug message
         * @note The message is split by `\n`,
         * the first line will be used as the header,
         * the rest of the lines will be used as footnotes.
         * Dots are added and removed accordingly.
         * Unless a footnote ends with either `!` or `?`, a dot will be placed
         * @note Use `%d` in footnotes to use the default error footnote
         */
        context: string;
        /** Emoji used for `context`, supports any Discord formattable emoji */
        emoji?: string;
    });
    private path;
    is(id: string): boolean;
}
/** Eror codes used for `AppError` handling */
type Codes = "UNKNOWN" | "EXPIRED" | "DUPLICATE" | "NOT_FOUND" | "NOT_ALLOWED" | "UNAUTHORIZED" | "INVALID" | "BAD_REQUEST" | "INTERNAL" | "TIMEOUT" | "CONFLICT" | "FORBIDDEN" | "TOO_MANY_REQUESTS" | "EXTERNAL";
export {};
