function calculateNextResetTime(timeframe) {
  const d = new Date();
  d.setMilliseconds(d.getMilliseconds() + timeframe);
  return d;
}

function MemoryStore(timeframe) {
  let hits = {};
  let resetTime = calculateNextResetTime(timeframe);

  this.increment = function (key) {
    if (hits[key]) {
      hits[key]++;
    } else {
      hits[key] = 1;
    }
    console.log(hits);
  };
}
