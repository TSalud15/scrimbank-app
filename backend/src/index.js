import express from "express";
import dotenv from "dotenv";

import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectDB from "./config/db.js";

import webhookRoutes from "./routes/webhook.route.js";
import sessionRoutes from "./routes/session.route.js";
import scrimRoutes from "./routes/scrim.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use("/api/webhooks", webhookRoutes);
app.use(express.json()); // parse req.body
app.use(clerkMiddleware());

// api routes
app.use("/api/sessions", requireAuth(), sessionRoutes);
app.use("/api/scrims", requireAuth(), scrimRoutes);

app.listen(PORT, () => {
    connectDB();

    console.log(`Server running on port ${PORT}`);
});
