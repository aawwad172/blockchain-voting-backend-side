import express from "express";
import authRoutes from "./routes/auth.js";
import * as db from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
	origin: "http://localhost:4000",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // Body parsing middleware

app.use(authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		await db.initialize();
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (err) {
		console.error("Failed to start server", err);
		process.exit(1);
	}
}

startServer();

process.on("SIGTERM", async () => {
	try {
		await db.close();
		process.exit(0);
	} catch (err) {
		console.error("Error during shutdown", err);
		process.exit(1);
	}
});
