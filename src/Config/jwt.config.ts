//#region Global Imports
import path from 'path';
//#endregion Global Imports

export const {
	JWT_KEY,
	JWT_ALGORITHM = 'RS256',
	JWT_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims',
} = process.env;
export const JWT_KEY_FILE_PATH = path.resolve(process.env.PWD || '.', 'custom/keys/private.pem');
