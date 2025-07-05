const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;

const url = 'mongodb://localhost:27017';
const database = 'ambulanceDB';
const client = new MongoClient(url);

async function dbConnect(collectionName) {
  let result = await client.connect();
  let db = result.db(database);
  return db.collection(collectionName);
}

app.get('/data', async (req, res) => {
  const collection = await dbConnect('datas');
  const data = await collection.find({}).toArray();
  res.send(data);
});

app.get('/callback', async (req, res) => {
  const collection = await dbConnect('callbackrequests');
  const data = await collection.find({}).toArray();
  res.send(data);
});

app.get('/', async (req, res) => {
  try {
    const datasCollection = await dbConnect('datas');
    const callbackCollection = await dbConnect('callbackrequests');

    const datas = await datasCollection.find({}).toArray();
    const callbacks = await callbackCollection.find({}).toArray();

    res.send({
      datas,
      callbackrequests: callbacks
    });
  } catch (error) {
    res.status(500).send({ error: "Database error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});


