export function parseStreamIdToBackend(streamId) {
  if (!streamId) {
    return undefined;
  }

  return streamId.replace(/\//g, '_').replace(/=/g, '').replace(/\+/g, '-');
}

export function openNewWindowSafely(url) {
  const newWindow = window.open(url);
  newWindow.opener = null;
}

export function handleOutline() {
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('tab-clicked');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleFirstMouseDown);
    }
  }

  function handleFirstMouseDown() {
    document.body.classList.remove('tab-clicked');

    window.removeEventListener('mousedown', handleFirstMouseDown);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);
}
