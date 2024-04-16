import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const WEB_DB = "web_app";
export let client: null | MongoClient = null;

export const connectToDatabase = async () => {
  if (client) {
    return { error: null, db: client.db(WEB_DB) };
  }
  if (!MONGODB_URI) {
    console.log("MongoDB URI not found");
    return { error: { message: "MongoDB URI not found" }, db: null };
  }
  try {
    client = new MongoClient(MONGODB_URI);
    console.log("Connected to MongoDB successfully.");

    await client.connect();
    return { error: null, db: client.db(WEB_DB) };
  } catch (error) {
    console.error("Error connecting to the database", error);
    return { error: { message: (error as Error).message }, db: null };
  }
};
