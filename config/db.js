import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "mydatabase",
	port: process.env.DB_PORT || 3307,
};

let pool;

export async function initialize() {
	try {
		pool = await mysql.createPool(dbConfig);
		console.log("Database connection pool created");
	} catch (err) {
		console.error("Error creating database connection pool:", err);
	}
}

export async function close() {
	try {
		if (pool) {
			await pool.end();
			console.log("Database connection pool closed");
		}
	} catch (err) {
		console.error("Error closing database connection pool:", err);
	}
}

export async function execute(query, params) {
	try {
		const [results] = await pool.execute(query, params);
		return results;
	} catch (err) {
		console.error("Error executing query:", err);
		throw err;
	}
}
