//#region Global Imports
import ApiGateway = require('moleculer-web');
import request from 'supertest';
//#endregion Global Imports

//#region Test Imports
import { BrokerHelper } from '@Test/Utils';
import { Mocks } from '@Test/Config/mock.setup';
//#endregion Test Imports

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

describe('JWKS service', () => {
  it('should GET request on jwks/Get', async () => {
    return request(server)
      .get('/jwks/Get')
      .then((res: request.Response) => {
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.body).toMatchObject<IJWKS.GetJWKSOutDto>(Mocks.JWKS.GetJWKSOutDto);
      });
  });

  it('should call jwks.Get action', async () => {
    const outDto = await broker.call('jwks.Get');
    expect(outDto).toMatchObject<IJWKS.GetJWKSOutDto>(Mocks.JWKS.GetJWKSOutDto);
  });
});
