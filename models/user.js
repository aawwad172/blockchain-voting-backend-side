const db = require('../config/db');

async function findUserByEmail(email) {
  console.log("Querying for email:", email);
  const query = `SELECT * FROM Users WHERE Email = ?`;
  console.log("Executing query:", query);
  const result = await db.execute(query, [email]);
  console.log("Query result:", result);
  return result.length ? result[0] : null;
}

async function getUsersByRole(role) {
  console.log("Querying for role:", role);
  const query = `SELECT * FROM Users WHERE Role = ?`;
  console.log("Executing query:", query);
  const result = await db.execute(query, [role]);
  console.log("Query result:", result);
  return result;
}

module.exports = {
  findUserByEmail,
  getUsersByRole
};
