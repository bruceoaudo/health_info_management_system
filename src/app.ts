import express from "express";
import dotenv from "dotenv";
import allRoutes from './routes/routes'

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // Serve static files

app.use('/api/v1/', allRoutes)

export default app;