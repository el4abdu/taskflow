import mongoose from 'mongoose';

// Define the cached mongoose connection type
type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

// Initialize global mongoose cache
declare global {
  var mongooseCache: MongooseCache;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Initialize the cached connection object
let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

// If not in production, set the global cache
if (process.env.NODE_ENV !== 'production') {
  global.mongooseCache = cached;
}

async function connectToDatabase(): Promise<mongoose.Connection> {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI as string, opts)
      .then((mongoose) => {
        return mongoose.connection;
      });
  }
  
  // Wait for connection to resolve
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    cached.promise = null; // Reset the promise so we can retry
    throw error;
  }
}

export default connectToDatabase; 