const KEY_STR = 'v1v2v3v4v5v6v7v8v9v0v1v2v3v4v5v6';

async function getCryptoKey() {
  const enc = new TextEncoder();
  return await window.crypto.subtle.importKey(
    'raw',
    enc.encode(KEY_STR),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptFromFrontend(plainText: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await getCryptoKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(plainText)
  );

  const encryptedArray = new Uint8Array(encryptedBuffer);
  
  // GCM tags are trailing 16 bytes in Web Crypto API output
  const cipherTextBytes = encryptedArray.slice(0, -16);
  const authTagBytes = encryptedArray.slice(-16);

  const bufToHex = (buf: Uint8Array) => 
    Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');

  return `${bufToHex(iv)}:${bufToHex(authTagBytes)}:${bufToHex(cipherTextBytes)}`;
}

export async function decryptInFrontend(encryptedData: string): Promise<string> {
  const [ivHex, authTagHex, cipherHex] = encryptedData.split(':');
  if (!ivHex || !authTagHex || !cipherHex) throw new Error('Invalid ciphertext packet format');

  const key = await getCryptoKey();
  
  const hexToBuf = (hex: string) => 
    new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

  const iv = hexToBuf(ivHex);
  const authTag = hexToBuf(authTagHex);
  const cipherText = hexToBuf(cipherHex);

  // Re-combine payload block structure for Web Crypto decipher consumption
  const combined = new Uint8Array(cipherText.length + authTag.length);
  combined.set(cipherText);
  combined.set(authTag, cipherText.length);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    combined
  );

  return new TextDecoder().decode(decryptedBuffer);
}