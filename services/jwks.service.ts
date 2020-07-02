//#region Global Imports
import { JSONWebKeySet } from 'jose';
import { Service as MoleculerService, ServiceBroker } from 'moleculer';
import { Action, Method, Service } from 'moleculer-decorators';
//#endregion Global Imports

//#region Config Imports
import { JWT_ALGORITHM, JWT_KEY, JWT_KEY_FILE_PATH, NODE_ENV, ApplicationEnvironments } from '@Config';
//#endregion Config Imports

//#region Interface Imports
import { IJWKS } from '@Interfaces';
//#endregion Interface Imports

//#region Local Imports
import { JWTKeyStore } from '@Meta/JWTKeyStore';
//#endregion Local Imports

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
  private _keyStore: JWTKeyStore;

  constructor(broker: ServiceBroker) {
    super(broker);
    this._keyStore = new JWTKeyStore();
    this._keyStore.addKey(JWT_KEY, JWT_KEY_FILE_PATH, JWT_ALGORITHM);
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
  public async Get(): Promise<IJWKS.GetJWKSOutDto> {
    return this.getJSONWebKeySet();
  }

  @Method
  private getJSONWebKeySet(): JSONWebKeySet {
    return this._keyStore.getJWKS();
  }

  created() {
    if (NODE_ENV === ApplicationEnvironments.DEV) {
      console.log(`Service 'jwks' environment.`, { JWT_ALGORITHM, JWT_KEY, JWT_KEY_FILE_PATH, NODE_ENV });
    }
  }
}

module.exports = JWKSService;