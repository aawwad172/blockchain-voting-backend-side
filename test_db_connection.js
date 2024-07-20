const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

async function testConnection() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to the database');

    const result = await connection.execute(`SELECT * FROM Users WHERE Email = :email`, { email: 'superadmin@example.com' });
    console.log('Query result:', result);
  } catch (err) {
    console.error('Error connecting to the database', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

testConnection();
