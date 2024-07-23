const ANSI = {
    /** escape code */
    reset: "[0m",
    // color codes
    black: "[30m",
    red: "[31m",
    green: "[32m",
    yellow: "[33m",
    blue: "[34m",
    magenta: "[35m",
    cyan: "[36m",
    white: "[37m",
    bold: {
        black: "[30;1m",
        red: "[31;1m",
        green: "[32;1m",
        yellow: "[33;1m",
        blue: "[34;1m",
        magenta: "[35;1m",
        cyan: "[36;1m",
        white: "[37;1m",
    },
};
/** Wrap `text` in ANSI colors */
const color = {};
color.bold = {};
const createColorFunction = (colorCode) => (text) => {
    return `\u001b${colorCode}${text}\u001b${ANSI.reset}`;
};
for (const [colorName, colorCode] of Object.entries(ANSI)) {
    if (colorName === "reset" || colorName === "bold" || typeof colorCode !== "string")
        continue;
    // @ts-ignore
    color[colorName] = createColorFunction(colorCode);
}
for (const [colorName, colorCode] of Object.entries(ANSI.bold)) {
    color.bold[colorName] = createColorFunction(colorCode);
}
export { color };
