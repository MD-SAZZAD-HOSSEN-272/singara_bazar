const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://officeSingara:ColrAAFnnHaDl66t@cluster0.bkupc6p.mongodb.net/?appName=Cluster0`;

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
