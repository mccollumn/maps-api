const { MongoClient } = require("mongodb");
require("dotenv").config();

const USER = process.env.MONGO_USERNAME;
const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);

// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.tyggb.mongodb.net/maps?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url);
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = "maps";

async function run() {
    console.log(url);

    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("locations");

        let locDoc = {
            name: "Test Location",
            rating: 3,
            comment: "Cool test, man",
            lat: 45.426884908241355,
            long: -122.52172814602221
        }

        const p = await col.insertOne(locDoc);
        const myDoc = await col.findOne();
        console.log(myDoc);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
module.exports = run;
