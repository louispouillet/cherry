const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo:BzrYZlGzBdVXtXdieIoZugSUfrlfBHKP@mainline.proxy.rlwy.net:40157";

let client;
let db;

async function connectDB() {
  if (db) {
    return db; 
  }

  try {
    client = new MongoClient(uri);
    await client.connect();

    db = client.db("Cherry");

    return db;
  } catch (error) {
    console.error("Error MongoDB Connection :", error);
    process.exit(1);
  }
}

module.exports = connectDB;