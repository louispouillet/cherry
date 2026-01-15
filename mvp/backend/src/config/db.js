const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
  const uri = (process.env.MONGODB_URI);
  if (db) {
    return db; 
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME );

    return db;
  } catch (error) {
    console.error("Error MongoDB Connection :", error);
    process.exit(1);
  }
}

module.exports = connectDB;