import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import { Server } from "socket.io";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 7777;

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");

  // Listening for server-originated events
  socket.on("serverEvent", (data) => {
    console.log(`Received data from client:  ${data}`);

    // Emitting events to clients
    setTimeout(() => {
      socket.emit(
        "clientEvent",
        `Message from server, Someone sent me: ${data}`,
      );
    }, 500);
  });
});
