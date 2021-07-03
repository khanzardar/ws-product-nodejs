let MemoryStore = {};

function incrementMemoryStore(key) {
  if (MemoryStore[key]) {
    MemoryStore[key]++;
  } else {
    MemoryStore[key] = 1;
  }

  console.log(MemoryStore);
}

async function rateLimitHandler(request, response, next) {
  const timeframe = 60 * 1000; //1 minute
  const maxHits = 5;
  const key = await request.ip;

  console.log(key);

  incrementMemoryStore(key);

  next();
}

module.exports = {
  rateLimitHandler,
};
