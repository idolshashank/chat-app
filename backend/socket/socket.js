import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // {userId: socketId}

// Helper to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	// Extract userId from socket handshake query
	const userId = socket.handshake.query.userId;
	if (userId) {
		userSocketMap[userId] = socket.id; // Map userId to socket.id
	}

	// Emit the list of online users to all clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Listen for disconnection
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		if (userId) {
			delete userSocketMap[userId]; // Remove user from map
			io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users
		}
	});
});

export { app, io, server };

