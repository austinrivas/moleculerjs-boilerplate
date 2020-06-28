//#region Global Imports
import { JWKS } from 'jose';
import { Context, Service as MoleculerService, ServiceBroker } from 'moleculer';
import { Action, Method, Service } from 'moleculer-decorators';
//#endregion Global Imports

//#region Local Imports
import { JWTMeta } from '@Meta/JWTMeta';
//#endregion Local Imports

//#region Interface Imports
import { IJWKS } from '@Interfaces';
//#endregion Interface Imports

/**
 * @swagger
 * tags:
 *   name: JWKS Service
 *   description: Creates a JWK Store and returns a valid jwks.
 */
@Service({
	name: 'jwks',
})
class JWKSService extends MoleculerService {
	private _keyStore: JWKS.KeyStore;

	constructor(broker: ServiceBroker) {
		super(broker);
		this._keyStore = JWTMeta.GetJWTStore();
	}

	/**
	 * @swagger
	 *
	 * definitions:
	 *
   *   JWKSResponseBody:
   *     type: object
   *     required:
   *       - keys
   *     properties:
   *       keys:
   *         type: array
   *         items:
   *           $ref: '#/definitions/JWK'
   * 
   *   JWK:
   *     type: object
   *     required:
   *       - e
   *       - n
   *       - kty
   *       - kid
   *     properties:
   *       e:
   *         type: string
   *         description: The exponent for the RSA public key.
   *         example: "AQAB"
   *       n:
   *         type: string
   *         description: The modulus for the RSA public key.
   *         example: "2I8AXk_HeToAVOwJEtK_JvvhXBOyiJiE8rIrED9p751M1VggaTTndi7IZjL7MQ_-GrYi-zDtXZUpuDp7joFI6ixe6MSG12LliDw34xLhmQA4rZbrj8KRDucBPvGgKJp_EoSfHnGp1jgV1U43Xe4oRQgaRnLjYXcYEeh0EZ7OmFTnEcwsNxxkTatiDYJxBiKz3gk-FD7KdiREyIBmHD3NGX2oK8LK9EsqYDkgPnRVejrqaezhn7mDhAwkBI4MayMlZG7ygMk-gsJNvtJa-XJpfxFYxA3J2rcBhBoOqrGjrhE0Yd17rQjI1F5vdy1lDopgHS7-BEDabQcJ9u3CCXcebQ"
   *       kty:
   *         type: string
   *         description: The family of cryptographic algorithms used with the key.
   *         example: "RSA"
   *       kid:
   *         type: string
   *         description: The unique identifier for the key.
   *         example: "dIPbFeRBudnKdeeinfgYG5AHNLPuRPegACK0CqLUwCc"
	 *
	 * responses:
	 *
	 *   JWKSResponse:
	 *     description: Ok
	 *     headers:
	 *       content-type:
	 *         description: The Content-Type entity header is used to indicate the media type of the resource.
	 *         schema:
	 *           type: string
	 *           example: 'application/json; charset=utf-8'
	 *       content-length:
	 *         description: The Content-Length entity-header field indicates the size of the entity-body.
	 *         schema:
	 *           type: integer
	 *           example: 436
	 *     schema:
	 *       type: object
	 *       $ref: '#/definitions/JWKSResponseBody'
	 *
	 * paths:
	 *
	 *  /jwks/Get:
	 *    get:
	 *      description: An endpoint that returns a valid jwks.
	 *      tags: [JWKS Service]
	 *      produces:
	 *        - application/json
	 *      responses:
	 *        200:
	 *          $ref: '#/responses/JWKSResponse'
	 *        501:
	 *          $ref: '#/responses/NotImplementedError'
	 *        5XX:
	 *          $ref: '#/responses/UncaughtError'
	 */
	@Action()
	public async Get(ctx: Context<IJWKS.GetJWKSInDto>): Promise<IJWKS.GetJWKSOutDto> {
		return await this.GetMethod(ctx);
	}

	@Method
	public async GetMethod(ctx: Context<IJWKS.GetJWKSInDto>): Promise<IJWKS.GetJWKSOutDto> {
		return this._keyStore.toJWKS(false);
	}
}

module.exports = JWKSService;
