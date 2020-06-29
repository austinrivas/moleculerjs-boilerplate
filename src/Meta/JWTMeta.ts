//#region Global Imports
import fs from 'fs';
import { JWK, JWKS } from 'jose';
import { Errors } from 'moleculer';
//#endregion Global Imports

//#region Config Imports
import { JWT_ALGORITHM, JWT_KEY, JWT_KEY_FILE_PATH } from '@Config';
//#endregion Config Imports

const RSA_TYPES = ['RS256', 'RS384', 'RS512'];

type JWTKey = JWK.RSAKey | JWK.ECKey | JWK.OKPKey | JWK.OctKey;

/**
 * Returns a generated RSA key and saves it to a local .pem file at the defined path.
 * @param path
 * @param algorithm
 */
export const createRSAKey = (path: string, algorithm: string): JWK.RSAKey => {
  const rsaKey = JWK.generateSync('RSA', 2048, { alg: algorithm, use: 'sig' }, true);
  fs.writeFileSync(path, rsaKey.toPEM(true));
  return rsaKey;
};

/**
 * Returns an RSA key by either reading it from and env var, file, or generating one from scratch.
 * @param jwtKey
 * @param path
 * @param algorithm
 */
export const getRSAKey = (
  jwtKey: string | undefined,
  path: string,
  algorithm: string,
): JWK.RSAKey => {
  if (jwtKey) {
    return parseRSAKey(jwtKey, algorithm);
  } else {
    try {
      return readRSAKey(path);
    } catch (error) {
      return createRSAKey(path, algorithm);
    }
  }
};

/**
 * Checks that a given key is an RSA key.
 * @param key
 */
export const isRSAKey = (key: JWTKey): key is JWK.RSAKey => {
  return JWK.isKey(key) && key.kty !== undefined && key.kty === 'RSA';
};

/**
 * Parses an RSA key fom a string and verfies it.
 * @param jwtKey
 * @param algorithm
 */
export const parseRSAKey = (jwtKey: string, algorithm: string): JWK.RSAKey => {
  try {
    const rsaKey = JWK.asKey(jwtKey, { alg: algorithm });
    rsaKey.toPEM(true);
    return rsaKey as JWK.RSAKey;
  } catch (error) {
    throw new Errors.MoleculerError(
      'Invalid RSA private key in the JWT_KEY environment variable.',
      500,
      'ERR_BAD_IMPLEMENTATION',
    );
  }
};

/**
 * Reads and RSA key from the defined path and verifies it.
 * @param path
 */
export const readRSAKey = (path: string): JWK.RSAKey => {
  const file = fs.readFileSync(path);
  const rsaKey = JWK.asKey(file);
  if (isRSAKey(rsaKey)) {
    return rsaKey;
  } else {
    throw new Errors.MoleculerError(
      `Invalid RSA private key retrieved from ${path}.`,
      500,
      'ERR_BAD_IMPLEMENTATION',
    );
  }
};

/**
 * Sets the JWT Key.
 * If RSA algorithm, then checks if the PEM has been passed on through the JWT_KEY
 * If not, tries to read the private.pem file, or generates it otherwise
 * If SHA algorithm, then uses the JWT_KEY environment variables
 * @param ENV_JWT_KEY
 * @param key_path
 * @returns JWK
 */
export const setJWTKey = (envKey: string | undefined, path: string, algorithm: string): JWTKey => {
  if (RSA_TYPES.includes(algorithm)) {
    return getRSAKey(envKey, path, algorithm);
  } else {
    throw new Errors.MoleculerError(
      `Invalid JWT algorithm: ${algorithm}`,
      500,
      'ERR_BAD_IMPLEMENTATION',
    );
  }
};

const jwtKey = setJWTKey(JWT_KEY, JWT_KEY_FILE_PATH, JWT_ALGORITHM);

export namespace JWTMeta {
  /**
   * Creates a JWKS store. Only works with RSA algorithms. Raises an error otherwise
   * @returns JWKS store
   */
  export const GetJWTStore = (): JWKS.KeyStore => {
    if (RSA_TYPES.includes(JWT_ALGORITHM) && isRSAKey(jwtKey)) {
      const keyStore = new JWKS.KeyStore();
      keyStore.add(jwtKey);
      return keyStore;
    } else {
      throw new Errors.MoleculerError(
        'JWKS is not implemented on this server.',
        501,
        'ERR_NOT_IMPLEMENTED',
      );
    }
  };
}
