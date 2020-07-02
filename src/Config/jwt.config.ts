//#region Global Imports
import path from 'path';
//#endregion Global Imports

//#region Config Imports
import { NODE_ENV, ApplicationEnvironments } from '@Config/application.config';
//#endregion Config Imports

/**
 * Generate a file path for an rsa key based on the app environment.
 * @param root 
 * @param env 
 */
const generateKeyPath = (root: string | undefined, env: ApplicationEnvironments) => {
  return env !== ApplicationEnvironments.PROD ? path.resolve(root || '.', `keys/${env}.pem`) : undefined;
}

export const {
  JWT_KEY,
  JWT_ALGORITHM = 'RS256',
  JWT_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims',
} = process.env;

export const JWT_KEY_FILE_PATH = generateKeyPath(process.env.PWD, NODE_ENV);
