import { color } from "./color.js";
/** Create a new custom logger with better formatting and dates */
export class Logger {
    name;
    format = (name, levelType, message) => {
        const timestamp = color.cyan(new Date().toISOString());
        const level = getColor(levelType)(`[${levelType.toUpperCase()}]`);
        name = color.bold.white(`[${name}]`);
        message = color.black(message);
        return `${timestamp} ${level} ${name}: ${message}`;
    };
    constructor(name) {
        this.name = name.toUpperCase();
    }
    info(message) {
        console.log(this.format(this.name, "info", message));
    }
    warn(message) {
        console.warn(this.format(this.name, "warn", message));
    }
    error(data, source) {
        console.error(this.format(this.name, "error", (source ? `an error occured on ${source}` : `an unknown error occurred`) + ":\n"), data);
    }
    data(data, context) {
        console.log(this.format(this.name, "data", (context ?? "data output") + ":\n"), data);
    }
}
function getColor(level) {
    switch (level) {
        case "info":
            return color.bold.green;
        case "warn":
            return color.bold.yellow;
        case "error":
            return color.bold.red;
        case "data":
            return color.bold.blue;
        default:
            return color.bold.white;
    }
}
