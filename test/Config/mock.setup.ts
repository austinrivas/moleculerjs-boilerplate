//#region Interface Imports
import { IJWKS } from '@Interfaces';
//#endregion Interface Imports

export namespace Mocks {
  export namespace JWKS {
    export const GetJWKSOutDto = {
      keys: [
        {
          e: 'AQAB',
          n:
            '1P31HRdpK1XSSAjLjCjqey1T4Jvap-ow9-bCRZuHkfXCdXGtDMkOL3gzBMu8VvAnAu0wlE2xzw15LhbjJdsVTL0mVm3rrzmqXA9Cg0LKf3gQxV_7jHmzqYmmsRLRfClrzrmzDHO6EBXu8OT0h7FLp_F4fdEfJXChmiSFSZaAO-zRdT-hYFtAl1iWMQf89bxLxb1goGXlavKdFiWYxlsSdTA9JMdsOid6uipSsfC_sI_zgzoRWY5E3nfOZy-dlJ0BtIyk8oOJOoXP3JtB1W_uC3aQMDJmPpw1hwpzW9jF_4isP1tRo7XCnwtgACbI_Jayh8tVhXFQb-vvrrcU7dy8Ww',
          kty: 'RSA',
          kid: 'NN1HXeBYpGx5MF9a0Rgjw-HrPjkb__siDWw84ezSUBw',
        },
      ],
    } as IJWKS.GetJWKSOutDto;
  }
}
