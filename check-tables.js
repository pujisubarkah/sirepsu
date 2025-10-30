import { Client } from 'pg';
import { config } from 'dotenv';

// Load environment variables
config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function getTableStructure() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully!');

    const tables = ['unit_kerja'];

    for (const tableName of tables) {
      console.log(`\n=== Structure of ${tableName} ===`);

      const columnResult = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'simbatik'
        AND table_name = $1
        ORDER BY ordinal_position;
      `, [tableName]);

      columnResult.rows.forEach(col => {
        console.log(`${col.column_name} ${col.data_type} ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

getTableStructure();