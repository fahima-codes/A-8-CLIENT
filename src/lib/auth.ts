import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL missing');

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('studioSpace');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: ['http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 100,
    requireEmailVerification: false,
  },

  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        },
      }
    : {}),

  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  },
});
