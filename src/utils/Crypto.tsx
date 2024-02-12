export function encrypt(id: string): string {
    let encryptedId = '';
    for (let i = 0; i < id.length; i++) {
      encryptedId += String.fromCharCode(id.charCodeAt(i) + 1);
    }
    encryptedId += ':';
    return encryptedId;
  }
  
export function decrypt(encryptedId: string) {
    if (encryptedId.charAt(encryptedId.length - 1) !== ":") {
      throw new Error("ID criptografado inválido");
    }
  
    const trimmedEncryptedId = encryptedId.slice(0, -1);
  
    let decryptedId = '';
    for (let i = 0; i < trimmedEncryptedId.length; i++) {
      decryptedId += String.fromCharCode(trimmedEncryptedId.charCodeAt(i) - 1);
    }
    return decryptedId;
  }
  