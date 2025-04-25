import mongoose from "mongoose";
import app from "./app";
import { createFakeDoctor } from "./utils/createFakeDoctor";

const PORT = process.env.PORT || 5000;
const MONGO_URI_DEV = process.env.MONGO_URI_DEV || "";

mongoose
  .connect(MONGO_URI_DEV)
  .then(async () => {
    console.log("MongoDB connected");

    await createFakeDoctor();
    
    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    // Graceful shutdown handlers
    process.on("SIGINT", () => {
      console.log("SIGINT received. Shutting down gracefully...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });

    // Error handlers
    ["uncaughtException", "unhandledRejection"].forEach((event) => {
      process.on(event, (error) => {
        console.error(`${event}:`, error);
      });
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));