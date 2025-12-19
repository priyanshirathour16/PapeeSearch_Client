import CryptoJS from 'crypto-js';

const SECRET_KEY = 'publication-secret-key-123'; // In production, use env variable

export const encryptId = (id) => {
    if (!id) return '';
    const ciphertext = CryptoJS.AES.encrypt(String(id), SECRET_KEY).toString();
    // Start replacing problematic characters for URL
    return encodeURIComponent(ciphertext);
};

export const decryptId = (encryptedId) => {
    if (!encryptedId) return null;
    try {
        const decodedText = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decodedText, SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (e) {
        console.error("Decryption failed", e);
        return null;
    }
};
