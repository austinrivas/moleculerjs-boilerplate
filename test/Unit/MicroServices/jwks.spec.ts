//#region Local Imports
import { BrokerHelper } from '@Test/Utils';
import { Mocks } from '@Test/Config/mock.setup';
//#endregion Local Imports

//#region Interface Imports
import { IJWKS } from '@Interfaces';
//#endregion Interface Imports

const broker = BrokerHelper.setupBroker();

beforeEach(async () => {
  await broker.start();
});

afterEach(async () => {
  await broker.stop();
});

describe('Test jwks service', () => {
  describe('jwks.Get Action', () => {
    it('returns a JSONWebKeySet', async () => {
      const jwks = await broker.call('jwks.Get');
      expect(jwks).toMatchObject<IJWKS.GetJWKSOutDto>(Mocks.JWKS.GetJWKSOutDto);
    });
  });
});
