require("dotenv").config();
const { MongoClient } = require("mongodb");

const USER = process.env.MONGO_USERNAME;
const PASSWORD = encodeURI(process.env.MONGO_PASSWORD);

// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.tyggb.mongodb.net?retryWrites=true&w=majority`;
async function run() {
    console.log(url);
    const client = await new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
module.exports = run;
