import { createHmac } from "crypto";
// Convert base32 encoded string to a buffer
function base32ToBuffer(base32) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let value = 0;
    let length = 0;
    base32 = base32.replace(/=+$/, "").toUpperCase();
    for (let i = 0; i < base32.length; i++) {
        const idx = alphabet.indexOf(base32[i]);
        if (idx === -1) {
            throw new Error("Invalid base32 character");
        }
        value = (value << 5) | idx;
        length += 5;
        if (length >= 8) {
            bits += String.fromCharCode((value >>> (length - 8)) & 0xff);
            length -= 8;
        }
    }
    return Buffer.from(bits, "binary");
}
// Convert integer to byte array
function intToBytes(num) {
    const buffer = Buffer.alloc(8);
    for (let i = 7; i >= 0; i--) {
        buffer[i] = num & 0xff;
        num = num >> 8;
    }
    return buffer;
}
/** Generate a Time-based one-time password (TOTP) from a `secret` */
export function generate(secret, timeStep = 30, digits = 6) {
    // Decode base32 secret
    const decodedSecret = base32ToBuffer(secret);
    // Get the current Unix time
    const time = Math.floor(Date.now() / 1000);
    // Calculate the counter value (time / timeStep)
    const counter = Math.floor(time / timeStep);
    // Convert counter to byte array
    const counterBytes = intToBytes(counter);
    // Generate HMAC-SHA1 hash
    const hash = createHmac("sha1", decodedSecret).update(counterBytes).digest();
    // Convert hash to integer
    const offset = hash[hash.length - 1] & 0xf;
    const binary = ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);
    // Generate the OTP
    const otp = binary % Math.pow(10, digits);
    // Return the OTP with leading zeros if needed
    return otp.toString().padStart(digits, "0");
}
