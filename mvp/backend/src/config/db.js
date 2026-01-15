const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectDB() {
  if (db) {
    return db; 
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("" + process.env.MONGODB_DB_NAME);

    return db;
  } catch (error) {
    console.error("Error MongoDB Connection :", error);
    process.exit(1);
  }
}

module.exports = connectDB;