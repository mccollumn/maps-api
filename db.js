const { MongoClient } = require("mongodb");
require("dotenv").config();

const USER = process.env.MONGO_USERNAME;
const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);

const dbName = "maps";

function getClient() {
  const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.tyggb.mongodb.net/maps?retryWrites=true&w=majority`;

  return new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function insertOne(payload, collectionName) {
  const client = getClient();

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
  const client = getClient();

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = await client.db(dbName);
    const col = await db.collection(collectionName);
    const cursor = await col.find({});

    return await cursor.toArray();
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

module.exports = { insertOne, retrieveAll };
