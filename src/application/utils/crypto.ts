import * as CryptoJS from 'crypto-js';

// Função para criptografar
export function encryptObject(object) {
  const jsonString = JSON.stringify(object); // Converte o objeto em string JSON
  const encrypted = CryptoJS.AES.encrypt(
    jsonString,
    process.env.SECRET_KEY_CRYPTO,
  ).toString(); // Criptografa a string JSON

  return encrypted;
}

// Função para descriptografar
export function decryptObject(encryptedObject) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedObject,
    process.env.SECRET_KEY_CRYPTO,
  ); // Descriptografa a string criptografada
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8); // Converte para string UTF-8

  return JSON.parse(decryptedString); // Converte a string JSON de volta para um objeto
}
// // Exemplo de uso:
// const myObject = { name: 'Cody', type: 'mascot', age: 3 };
// const process.env.SECRET_KEY_CRYPTO = 'my_secret_key';

// // Criptografa o objeto
// const encryptedObject = encryptObject(myObject, process.env.SECRET_KEY_CRYPTO);
// console.log('Objeto criptografado:', encryptedObject);

// // Descriptografa o objeto
// const decryptedObject = decryptObject(encryptedObject, process.env.SECRET_KEY_CRYPTO);
// console.log('Objeto descriptografado:', decryptedObject);
