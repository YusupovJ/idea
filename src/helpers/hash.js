import { randomBytes, scryptSync } from "crypto";

const encrypt = (password, salt) => {
    return scryptSync(password, salt, 32).toString("hex");
};

class Crypt {
    hash(string) {
        const salt = randomBytes(16).toString("hex");
        return encrypt(string, salt) + salt;
    }

    compare(string, hash) {
        const salt = hash.slice(64);
        const originalHash = hash.slice(0, 64);
        const currentHash = encrypt(string, salt);
        return originalHash === currentHash;
    }
}

export default new Crypt();
