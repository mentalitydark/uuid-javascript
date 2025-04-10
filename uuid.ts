function uuid(): string {
    let crypto: Crypto
    if (typeof window === "undefined") {
        crypto = require("node:crypto")
    } else {
        crypto = window.crypto
    }

    const bytes = new Uint8Array(16)

    crypto.getRandomValues(bytes)

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    return Array
        .from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
        .join('')
        .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}
