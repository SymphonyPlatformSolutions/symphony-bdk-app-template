// Use this file to generated the fake data.

/*
  -- DEMO
  Demo mock information, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
*/
function generateDemoInfo() {
  return [
    { id: 0, name: 'Guarana', isFruit: true },
    { id: 1, name: 'Açaí', isFruit: true },
    { id: 2, name: 'Pitaya', isFruit: true },
    { id: 3, name: 'Graviola', isFruit: true },
    { id: 4, name: 'Sapoti', isFruit: true },
    { id: 5, name: 'Pitanga', isFruit: true },
    { id: 6, name: 'Cará', isFruit: false },
    { id: 7, name: 'Moranga', isFruit: false },
    { id: 8, name: 'Chuchu', isFruit: false },
    { id: 9, name: 'Jiló', isFruit: false },
    { id: 10, name: 'Maxixe', isFruit: false },
  ];
}

module.exports = { generateDemoInfo };
