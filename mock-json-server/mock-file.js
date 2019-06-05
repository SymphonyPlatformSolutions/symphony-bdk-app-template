// Use this file to generated the fake data.

/*
  -- DEMO
  Demo mock information, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
*/
function generateDemoInfo() {
  const fruit = [
    { name: 'Guarana', isFruit: true },
    { name: 'Açaí', isFruit: true },
    { name: 'Pitaya', isFruit: true },
    { name: 'Graviola', isFruit: true },
    { name: 'Sapoti', isFruit: true },
    { name: 'Pitanga', isFruit: true },
    { name: 'Cará', isFruit: false },
    { name: 'Moranga', isFruit: false },
    { name: 'Chuchu', isFruit: false },
    { name: 'Jiló', isFruit: false },
    { name: 'Maxixe', isFruit: false },
  ];
  const numInArray = Math.floor(Math.random() * (fruit.length - 2)) + 2;
  const returnValue = [];
  for (let i = 0; i < numInArray; i += 1) {
    returnValue.push(fruit.splice(Math.floor(Math.random() * fruit.length), 1)[0]);
  }

  return {
    content: returnValue,
  };
}

module.exports = { generateDemoInfo };
