//#region Global Imports
import { JSONWebKeySet } from 'jose';
//#endregion Global Imports

export namespace IJWKS {
	export interface GetJWKSInDto {}
	export interface GetJWKSOutDto extends JSONWebKeySet {}
}
