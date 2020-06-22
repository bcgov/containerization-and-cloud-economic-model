import * as constants from '@/utils/constants';
import * as attestationFormOptions from '@/utils/attestationFormOptions';

describe('Attestation Form Options', () => {
  describe('Options', () => {
    it('contains all 3 forms', () => {
      expect(attestationFormOptions.Options).toBeTruthy();
      expect(Object.keys(attestationFormOptions.Options).length).toBe(3);
      expect(attestationFormOptions.Options[constants.FormNames.AGRISEAFOODOPSCREENING]).toBeTruthy();
      expect(attestationFormOptions.Options[constants.FormNames.FORESTRYSECTOROPSCREENING]).toBeTruthy();
      expect(attestationFormOptions.Options[constants.FormNames.MINESOPERATORSCREENING]).toBeTruthy();
      expect(attestationFormOptions.Options['xxx']).toBeUndefined();
    });
  });

  describe('getFormOptions', () => {
    it('returns an object when a correct form name is passed in', () => {
      expect(attestationFormOptions.getFormOptions(constants.FormNames.AGRISEAFOODOPSCREENING)).toBeTruthy();
      expect(attestationFormOptions.getFormOptions(constants.FormNames.AGRISEAFOODOPSCREENING)).toBeInstanceOf(Object);
    });
  });
});
