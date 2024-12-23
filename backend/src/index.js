import express from "express";
import dotenv from "dotenv";

import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // parse req.body
app.use(clerkMiddleware());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
