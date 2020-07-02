//#region Global Imports
import path from 'path';
//#endregion Global Imports

//#region Config Imports
import { NODE_ENV, ApplicationEnvironments } from '@Config/application.config';
//#endregion Config Imports

/**
 * A typeguard to ensure a string is a valid file path
 * @param path 
 */
const keyFilePathRegex = /^[.]*\/([A-z0-9-_+]+\/)*([A-z0-9]+\.(pem))$/
const keyFilePattern = new RegExp(keyFilePathRegex);
export type KeyFilePath = string;
export const isKeyFilePath = (path: string): path is KeyFilePath => {
  return typeof path === "string" && keyFilePattern.test(path);
}

/**
 * Generate a file path for an rsa key based on the app environment.
 * @param root 
 * @param env 
 */
export const generateKeyPath = (root: string | undefined, env: ApplicationEnvironments): KeyFilePath => {
  return path.resolve(root || '.', `keys/${env}.pem`);
}

export const {
  JWT_KEY,
  JWT_ALGORITHM = 'RS256',
  JWT_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims',
} = process.env;

export const JWT_KEY_FILE_PATH = generateKeyPath(process.env.PWD, NODE_ENV);
