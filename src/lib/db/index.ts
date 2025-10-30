import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Database connection string from environment (fallback provided)
const connectionString = env.DATABASE_URL || 'postgresql://postgres.tcddtfjutcweujoqwtlu:PAAYphUUf7KYz-2@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

console.log('Database URL:', connectionString ? 'Set' : 'Not set');
console.log('Connection string starts with:', connectionString.substring(0, 20) + '...');

// Create postgres client with SSL configuration
const pgClient = postgres(connectionString, {
	prepare: false,
	ssl: false // disable SSL for development; set to true/require in production
});

// Ensure the connection uses the simbatik schema — run at client init
// Use a promise but don't block module import; log errors if any
pgClient`SET search_path TO simbatik`.then(() => {
	console.log('search_path set to simbatik');
}).catch((err: any) => {
	console.error('Failed to set search_path:', err);
});

// Create drizzle instance with schema
export const db = drizzle(pgClient, { schema });
export const client = pgClient;