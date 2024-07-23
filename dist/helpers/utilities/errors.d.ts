/** Custom error class with helpful additions */
export declare class Base extends Error {
    /** Error identifier */
    id: string;
    /** Error code name */
    name: keyof typeof Codes;
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
         */
        context: string;
        /** Emoji used for `context`, supports any Discord formattable emoji */
        emoji?: string;
    });
    private path;
    is(id: string): boolean;
}
/** Eror codes used for `BotError` handling */
export declare enum Codes {
    /** Unknown error */
    UNKNOWN = 0,
    /** The resource has expired */
    EXPIRED = 1,
    /** Duplicate resource found */
    DUPLICATE = 2,
    /** Resource not found */
    NOT_FOUND = 3,
    /** Operation not allowed */
    NOT_ALLOWED = 4,
    /** Unauthorized access */
    UNAUTHORIZED = 5,
    /** Invalid input or request */
    INVALID = 6,
    /** Bad input or malformed request */
    BAD_REQUEST = 7,
    /** Unexpected internal error */
    INTERNAL = 8,
    /** Request timed out */
    TIMEOUT = 9,
    /** Conflicting resource state */
    CONFLICT = 10,
    /** Action is forbidden */
    FORBIDDEN = 11,
    /** Resource is rate limited */
    TOO_MANY_REQUESTS = 12,
    /** External unknown error */
    EXTERNAL = 13
}
