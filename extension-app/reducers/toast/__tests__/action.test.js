import { REMOVE_TOAST } from '../types';
import { removeToast, overrideToast } from '../actions';

describe('Action Toast', () => {
  it('Should have a REMOVE_TOAST action', () => {
    const removeType = {
      type: REMOVE_TOAST,
    };
    expect(removeToast()).toEqual(removeType);
  });

  it('Should have a REMOVE_TOAST action', () => {
    const overrideType = 'OVERRIDE_TYPE';
    const overrideText = 'Override Text';
    const overrideData = 'data';

    expect(overrideToast(overrideType, overrideText, overrideData)).toEqual({
      type: overrideType,
      payload: {
        data: overrideData,
        text: overrideText,
      },
    });
  });
});
