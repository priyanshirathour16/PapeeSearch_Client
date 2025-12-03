import CryptoJS from 'crypto-js';

const SECRET_KEY = 'client-secret-key-123'; // In production, use env variable

export const setRole = (role) => {
    const ciphertext = CryptoJS.AES.encrypt(role, SECRET_KEY).toString();
    localStorage.setItem('role', ciphertext);
};

export const getRole = () => {
    const ciphertext = localStorage.getItem('role');
    if (!ciphertext) return 'guest';
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText || 'guest';
    } catch (e) {
        return 'guest';
    }
};

export const clearRole = () => {
    localStorage.removeItem('role');
};
