import CryptoJS from "crypto-js";

const ENCRYPTED_KEY = process.env.ENCRYPTION_KEY;

// Encrypt function
function encrypt(plainText) {
    console.log("PLAIN TEXT:", plainText);

    // Ensure the key is treated as a word array for encryption
    var ciphertext = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY), {
        mode: CryptoJS.mode.CBC,  // Common encryption mode
        padding: CryptoJS.pad.Pkcs7, // Padding scheme
        iv: CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY.substring(0, 16)) // Use the first 16 characters of the key as the IV
    }).toString();

    return ciphertext;
}

// Decrypt function
function decrypt(ciphertext) {
    console.log("ENCRYPTED TEXT  :", ciphertext);

    // Decrypt the ciphertext using the same key, mode, and IV as the encryption process
    var bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY), {
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse(ENCRYPTED_KEY.substring(0, 16))
    });

    // Convert the bytes to a string in UTF-8 encoding
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("DECRYPTION:", originalText);

    return originalText;
}

export { encrypt, decrypt };
