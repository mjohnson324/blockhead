const Sound = require('../sound');

const sound = new Sound();

test('Sound controller', () => {
  expect(sound.gameMusic).not.toBeNull();
})
