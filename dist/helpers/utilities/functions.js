/** Returns a promise that resolves after `seconds` */
export const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
/** Returns the current UNIX timestamp in seconds */
export const nowSeconds = () => Math.floor(Date.now() / 1000);
/** Returns a random integer between `min` and `max` */
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
