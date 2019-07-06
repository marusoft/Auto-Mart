import 'dotenv/config';
import { Pool } from 'pg';


const pool = new Pool({
  connectionString: process.env.TEST_ENV ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
});

export default pool;
