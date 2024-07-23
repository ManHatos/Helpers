declare const ANSI: {
    /** escape code */
    reset: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bold: {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
    };
};
/** Wrap `text` in ANSI colors */
declare const color: { [K in keyof typeof ANSI as Exclude<K, "reset" | "bold">]: ColorFunction; } & {
    bold: { [K in keyof typeof ANSI.bold]: ColorFunction; };
};
export { color };
type ColorFunction = (text: string) => string;
