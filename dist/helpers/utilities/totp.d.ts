/** Generate a Time-based one-time password (TOTP) from a `secret` */
export declare function generate(secret: string, timeStep?: number, digits?: number): string;
