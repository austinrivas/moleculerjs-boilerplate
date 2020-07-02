//#region Global Imports
import { JWK } from 'jose';
//#endregion Global Imports

//#region Config Imports
import { JWT_KEY_FILE_PATH, isKeyFilePath } from '@Config';
//#endregion Config Imports

//#region Meta Imports
import { EncryptionAlgorithm, JWTKeyStore } from '@Meta';
//#endregion Meta Imports

const octKey = JWK.generateSync('oct');

describe('JWTKeyStore', () => {
  it('should be defined', () => {
    expect(JWTKeyStore).toBeDefined();
  });

  it('should read an RSA key from a file', async () => {
    const key = JWTKeyStore.readRSAKey(JWT_KEY_FILE_PATH);
    expect(JWK.isKey(key)).toEqual(true);
    expect(key.kty).toEqual('RSA');
  });

  it('should verify an RSA key', async () => {
    const rsaKey = JWTKeyStore.readRSAKey(JWT_KEY_FILE_PATH);
    expect(JWTKeyStore.isRSAKey(rsaKey)).toEqual(true);
    expect(JWTKeyStore.isRSAKey(octKey)).toEqual(false);
  });

  it('should create an RSA key', async () => {
    const RS256 = JWTKeyStore.createRSAKey(EncryptionAlgorithm.RS256);
    const RS384 = JWTKeyStore.createRSAKey(EncryptionAlgorithm.RS384);
    const RS512 = JWTKeyStore.createRSAKey(EncryptionAlgorithm.RS512);
    expect(JWTKeyStore.isRSAKey(RS256)).toEqual(true);
    expect(JWTKeyStore.isRSAKey(RS384)).toEqual(true);
    expect(JWTKeyStore.isRSAKey(RS512)).toEqual(true);
  });
});
