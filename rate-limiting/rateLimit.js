const Datastore = require("nedb");
const db = new Datastore({ filename: "data/rate-limit.db", autoload: true });

let MemoryStore = {};

db.loadDatabase();

function incrementMemoryStore(key) {
  db.find({ userID: key }, (err, docs) => {
    console.log(docs);
    if (docs.length === 0) {
      db.insert({ userID: key, hits: 1 }, (err) => {
        if (err) {
          console.log(
            `The following error occured when inserting a new user: ${err}`
          );
        }
      });
    } else {
      db.update({ userID: key }, { $inc: { hits: 1 } }, (err) => {
        if (err) {
          console.log(
            `The following error occured when updating user's hits: ${err}`
          );
        }
      });
    }
    if (err) {
      console.log(`The following error occured when finding user's IP: ${err}`);
    }
  });
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
