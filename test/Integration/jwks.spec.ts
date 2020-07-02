//#region Global Imports
import ApiGateway = require('moleculer-web');
import request from 'supertest';
//#endregion Global Imports

//#region Local Imports
import { BrokerHelper } from '@Test/Utils';
//#endregion Local Imports

//#region Interface Imports
import { IJWKS } from '@Interfaces';
//#endregion Interface Imports

const broker = BrokerHelper.setupBroker();
let server: Record<string, unknown>;

beforeAll(async () => {
  const service = broker.createService(ApiGateway);
  server = service.server;
  return broker.start();
});

afterAll(async () => broker.stop());

describe('Test JWKS service requests', () => {
  it('Test GET request on jwks/Get', async () => {

    const outDto = {
      "keys": [
        {
          "e": "AQAB",
          "n": "1P31HRdpK1XSSAjLjCjqey1T4Jvap-ow9-bCRZuHkfXCdXGtDMkOL3gzBMu8VvAnAu0wlE2xzw15LhbjJdsVTL0mVm3rrzmqXA9Cg0LKf3gQxV_7jHmzqYmmsRLRfClrzrmzDHO6EBXu8OT0h7FLp_F4fdEfJXChmiSFSZaAO-zRdT-hYFtAl1iWMQf89bxLxb1goGXlavKdFiWYxlsSdTA9JMdsOid6uipSsfC_sI_zgzoRWY5E3nfOZy-dlJ0BtIyk8oOJOoXP3JtB1W_uC3aQMDJmPpw1hwpzW9jF_4isP1tRo7XCnwtgACbI_Jayh8tVhXFQb-vvrrcU7dy8Ww",
          "kty": "RSA",
          "kid": "NN1HXeBYpGx5MF9a0Rgjw-HrPjkb__siDWw84ezSUBw"
        }
      ]
    } as IJWKS.GetJWKSOutDto

    return request(server)
      .get('/jwks/Get')
      .then((res: request.Response) => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.body).toMatchObject<IJWKS.GetJWKSOutDto>(outDto)
      });
  });
});
