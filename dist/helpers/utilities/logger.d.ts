/** Create a new custom logger with better formatting and dates */
export declare class Logger {
    private name;
    private format;
    constructor(name: string);
    info(message: string): void;
    warn(message: string): void;
    error(data: any, source?: string): void;
    data(data: any, context?: string): void;
}
