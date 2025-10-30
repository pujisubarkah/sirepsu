import { Client } from 'pg';
import { config } from 'dotenv';

// Load environment variables
config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully!');

    // Check current schema
    const schemaResult = await client.query('SELECT current_schema()');
    console.log('Current schema:', schemaResult.rows[0].current_schema);

    // List all schemas
    const schemasResult = await client.query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name NOT LIKE 'pg_%'
      AND schema_name != 'information_schema'
      ORDER BY schema_name
    `);
    console.log('Available schemas:', schemasResult.rows.map(r => r.schema_name));

    // Check if simbatik schema exists
    const simbatikExists = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.schemata
        WHERE schema_name = 'simbatik'
      )
    `);
    console.log('Schema simbatik exists:', simbatikExists.rows[0].exists);

    // Try to list tables in simbatik schema
    try {
      const tablesResult = await client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'simbatik'
        ORDER BY table_name
      `);
      console.log('Tables in simbatik schema:', tablesResult.rows.map(r => r.table_name));
    } catch (error) {
      console.log('Error listing tables in simbatik schema:', error.message);
    }

  } catch (error) {
    console.error('Connection failed:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();