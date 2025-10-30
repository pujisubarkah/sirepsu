import { config } from 'dotenv';

// Load environment variables
config();

console.log('DATABASE_URL from dotenv:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('DATABASE_URL value:', process.env.DATABASE_URL);