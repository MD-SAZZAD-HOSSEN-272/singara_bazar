const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODBURL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export default function dbConnect (collectionName) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db('SingaraCollection').collection(collectionName)

}
