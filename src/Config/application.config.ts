//#region Global Imports
import { Errors } from 'moleculer';
//#endregion Global Imports

export enum ApplicationEnvironments {
  DEV = 'development',
  PROD = 'production',
  QA = 'qa',
  STAGE = 'staging',
  TEST = 'test'
}

/**
 * Type guard to ensure that process.env.NODE_ENV is a valid value.
 * @param env 
 */
const isApplicationEnvironment = (env: string | undefined): env is ApplicationEnvironments => {
  return Object.values(ApplicationEnvironments).includes(env as ApplicationEnvironments);
}

/**
 * Guard to check if the env is a live deployed environment
 * @param env 
 */
export const isLiveEnvironment = (env: ApplicationEnvironments) => {
  return env === ApplicationEnvironments.PROD || env === ApplicationEnvironments.STAGE;
}

if (!isApplicationEnvironment(process.env.NODE_ENV)) {
  throw new Errors.MoleculerError(
    `Invalid Application Environment ${process.env.NODE_ENV}.`,
    500,
    'ERR_BAD_IMPLEMENTATION',
  );
}

export const {
  NODE_ENV
} = process.env