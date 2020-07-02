//#region Global Imports
import { Errors } from 'moleculer';
//#endregion Global Imports

export function assertNever(nope: never, message: string): never {
  throw new Errors.MoleculerError(`${message}: ${nope}.`, 500, 'ERR_BAD_IMPLEMENTATION');
}
