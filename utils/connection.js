const mongoose = require('mongoose');

const connection = {};
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME;
const uri = `mongodb://${user}:${password}@${host}:${port}`;

module.exports = async function connect() {
  if (connection.isConnected) {
    return;
  }

  console.info({host, port, dbName});
  
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName
  });

  connection.isConnected = db.connections[0].readyState;
};
