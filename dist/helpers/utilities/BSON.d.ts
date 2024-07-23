/** BigInt JSON (BSON) (made up) is a helpful class to deal with JSON serialization with proper BigInt handling as well as interoperability with the native `JSON.parse` function for `BSON.text` */
export declare class BSON<T = any> {
    /** The serialized BSON object as a string */
    text: string;
    /** The BSON in native JavaScript */
    native: T;
    constructor(data: string | T);
    private serialize;
    private parse;
}
