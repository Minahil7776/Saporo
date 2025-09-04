import mongoose from "mongoose";

declare global {
  // Prevent multiple connections in development
  var cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.cached ?? (global.cached = { conn: null, promise: null });

export async function connectToDatabase() {
  // Check if the connection URI exists.
  if (!process.env.MONGO_URL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env.local');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // You can remove the "!" now as you have an explicit check above.
    cached.promise = mongoose.connect(process.env.MONGO_URL);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}