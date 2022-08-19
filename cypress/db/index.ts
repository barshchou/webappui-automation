import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'comp-plex-dev';
const collectionName = "sales-transactions";

const _filter = {
    'latestVersion.saleInformation.saleStatus': 'transaction'
};

const getDataFromDb = async () => {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let data = await collection.find(_filter, { limit:10 }).toArray();

    client.close();

    // the following code examples can be pasted here...

    return data;
};

export default {
    getDataFromDb
};