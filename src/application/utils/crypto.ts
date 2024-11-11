import * as CryptoJS from 'crypto-js';

// Função para criptografar
export function encryptObject(object) {
  const jsonString = JSON.stringify(object);
  const encrypted = CryptoJS.AES.encrypt(
    jsonString,
    process.env.SECRET_KEY_CRYPTO,
  ).toString();

  return encrypted;
}

export function decryptObject(encryptedObject) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedObject,
    process.env.SECRET_KEY_CRYPTO,
  );
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(decryptedString);
}
