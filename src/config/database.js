const { Pool } = require('pg');
require('dotenv').config();

// En la nube (Render/Neon), DATABASE_URL requiere SSL habilitado
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction || process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error de conexión a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conexión exitosa a la base de datos PostgreSQL.');
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};