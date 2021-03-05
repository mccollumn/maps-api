const { MongoClient } = require("mongodb");
require("dotenv").config();

const USER = process.env.MONGO_USERNAME;
const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);

// Replace the following with your Atlas connection string
const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.tyggb.mongodb.net/maps?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url);

const dbName = "maps";

async function insertOne(payload, collectionName) {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection(collectionName);

    return await col.insertOne(payload);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

async function retrieveAll(collectionName) {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection(collectionName);

    //return await col.find({});
    const cursor = col.find({});
    let results = [];
    for await (const doc of cursor) {
      results.push(doc);
    }
    return results;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

module.exports = { insertOne, retrieveAll };
