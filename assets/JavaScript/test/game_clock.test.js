const GameClock = require('../clock');

const testClock = new GameClock();

test('Time increases incrementally by seconds', () => {
  testClock.upTick();
  expect(testClock.gameTimeSeconds).toEqual(1);
});

test('Clock correctly parses minutes and seconds for display', () => {
  testClock.gameTimeSeconds = 5;
  expect(testClock.currentTime()).toEqual({ minutes: 0, seconds: 5 });
  testClock.gameTimeSeconds = 458;
  expect(testClock.currentTime()).toEqual({ minutes: 7, seconds: 38 });
  testClock.gameTimeSeconds = 3599;
  expect(testClock.currentTime()).toEqual({ minutes: 59, seconds: 59 });
});
