/** Returns a promise that resolves after `seconds` */
export declare const sleep: (seconds: number) => Promise<void>;
/** Returns the current UNIX timestamp in seconds */
export declare const nowSeconds: () => number;
/** Returns a random integer between `min` and `max` */
export declare const randomInt: (min: number, max: number) => number;
