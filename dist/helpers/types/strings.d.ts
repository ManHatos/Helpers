/** Create a value of type string with optional options, supports intellisense */
export type Options<options extends string> = options | (string & {});
