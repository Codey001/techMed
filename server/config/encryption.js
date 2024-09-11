import CryptoJS from "crypto-js";

const ENCRYPTED_KEY = process.env.ENCRYPTION_KEY;

function encrypt(plainText) {
    var ciphertext = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY), {
        mode: CryptoJS.mode.CBC,  
        padding: CryptoJS.pad.Pkcs7, 
        iv: CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY.substring(0, 16)) 
    }).toString();

    return ciphertext;
}

function decrypt(ciphertext) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY), {
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY.substring(0, 16))
    });

    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export { encrypt, decrypt };
