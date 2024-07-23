import { Errors } from "../../helpers.js";
/** BigInt JSON (BSON) (made up) is a helpful class to deal with JSON serialization with proper BigInt handling as well as interoperability with the native `JSON.parse` function for `BSON.text` */
export class BSON {
    /** The serialized BSON object as a string */
    text;
    /** The BSON in native JavaScript */
    native;
    constructor(data) {
        if (typeof data === "string") {
            this.text = data;
            this.native = this.parse(data);
        }
        else {
            this.native = data;
            this.text = this.serialize(data);
        }
    }
    serialize(data) {
        return JSON.stringify(data, (_, value) => (typeof value === "bigint" ? `$${value}n` : value));
    }
    parse(data) {
        try {
            return JSON.parse(data, (_, value) => {
                if (typeof value === "string" && /^\$[+-]?\d+n$/.test(value)) {
                    try {
                        return BigInt(value.slice(1, -1));
                    }
                    catch (_) {
                        return value;
                    }
                }
                return value;
            });
        }
        catch (_) {
            throw new Errors.Base({
                code: Errors.Codes.INVALID,
                context: "Invalid BSON string provided",
            });
        }
    }
}
