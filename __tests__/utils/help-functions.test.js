import {
  parseStreamIdToBackend, openNewWindowSafely, handleOutline,
} from '../../src/utils/help-functions';

describe('Util functions', () => {
  describe('Function "parseStreamIdToBackend"', () => {
    it('Should handle empty StreamId', () => {
      const parsedStreamId = parseStreamIdToBackend('');
      expect(parsedStreamId).toEqual(undefined);
    });

    it('Should parse StreamId to backend format', () => {
      const parsedStreamId = parseStreamIdToBackend('abc/def//ghi+jkl==');
      expect(parsedStreamId).toEqual('abc_def__ghi-jkl');
    });
  });

  describe('Function "openNewWindowSafely"', () => {
    global.window.open = jest.fn(() => ({ opener: 'main window' }));

    it('Should open new tab with URL and set opener="null"', () => {
      openNewWindowSafely('http://www.symphony.com');
      expect(global.window.open).toHaveBeenCalledWith('http://www.symphony.com');
      expect(global.window.open).toReturnWith({ opener: null });
    });
  });

  describe('Function "handleOutline"', () => {
    const originalEventListener = window.addEventListener;

    it('Should start listenning to "keydown" event', () => {
      window.addEventListener = jest.fn();
      handleOutline();

      expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
      window.addEventListener = originalEventListener;
    });

    it('Should handle a sequence of "tab" key and mouse click', () => {
      handleOutline();

      // simulate the "tab"
      const tabEvent = new KeyboardEvent('keydown', { keyCode: 9 });
      window.dispatchEvent(tabEvent);

      expect(document.body.classList[0]).toEqual('tab-clicked');

      // simulate the mouse click
      const clickEvent = new MouseEvent('mousedown');
      window.dispatchEvent(clickEvent);

      expect(document.body.classList.length).toEqual(0);
    });
  });
});
