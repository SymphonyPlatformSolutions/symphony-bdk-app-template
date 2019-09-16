import {
  convertToHashtag,
} from '../template-builder-utils';

describe('Template Builder Util functions', () => {
  describe('Function "convertToHashtag"', () => {
    it('Should handle text', () => {
      const convertedText = convertToHashtag('Name A');
      expect(convertedText).toEqual('namea');
    });
  });
});
