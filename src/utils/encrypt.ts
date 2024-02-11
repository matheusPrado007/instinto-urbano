// Função de criptografia simples (apenas para fins educacionais)
export function encrypt(id: any) {
  let encryptedId = '';
  for (let i = 0; i < id.length; i++) {
    encryptedId += String.fromCharCode(id.charCodeAt(i) + 1);
  }
  encryptedId += ':';
  return encryptedId;
}

// Função de descriptografia simples (apenas para fins educacionais)
export function decrypt(encryptedId: any) {
    let decryptedId = '';
    // Remove o ':' do final da string criptografada antes de iniciar a descriptografia
    encryptedId = encryptedId.substring(0, encryptedId.length - 1);
    for (let i = 0; i < encryptedId.length; i++) {
      decryptedId += String.fromCharCode(encryptedId.charCodeAt(i) - 1);
    }
    return decryptedId;
  }
  