import express from "express";
import dotenv from "dotenv";

import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";

import webhookRoutes from "./routes/webhook.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // parse req.body
app.use(clerkMiddleware());

// api routes
app.use("/api/webhooks", webhookRoutes);

app.listen(PORT, () => {
    connectDB();

    console.log(`Server running on port ${PORT}`);
});
