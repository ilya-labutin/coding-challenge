const mongoose = require('mongoose');

const connection = {};

const prefix = process.env.MONGO_PREFIX;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB_NAME;
const uri = `${prefix}://${user}:${password}@${host}?retryWrites=true&w=majority`;

module.exports = async function connect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName,
  });

  connection.isConnected = db.connections[0].readyState;
};
