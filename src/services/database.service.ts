// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { cafes?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  if (!process.env.DB_CONN_STRING) {
    throw new Error("Missing DB_CONN_STRING in environment");
  }

  if (!process.env.DB_NAME) {
    throw new Error("Missing DB_NAME in environment");
  }

  if (!process.env.CAFES_COLLECTION_NAME) {
    throw new Error("Missing CAFES_COLLECTION_NAME in environment");
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const cafesCollection: mongoDB.Collection = db.collection(
    process.env.CAFES_COLLECTION_NAME
  );

  collections.cafes = cafesCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${cafesCollection.collectionName}`
  );
}
