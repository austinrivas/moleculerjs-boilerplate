//#region Local Imports
import { BrokerHelper } from '@Test/Utils';
//#endregion Local Imports

const broker = BrokerHelper.setupBroker();

beforeEach(async () => {
	await broker.start();
});

afterEach(async () => {
	await broker.stop();
});

describe('Test jwks service', () => {
	describe('getJWK Method', () => {
		it('returns a jwk', async () => {
			const jwk = '';
			expect(jwk).toContain('jwk');
		});
	});
});
