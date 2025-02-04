import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express();
app.use(cors());
app.use(json()); // Enable JSON body parsing

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (change for security)
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// API route to trigger a notification
app.post("/send-notification", (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    io.emit("update_matches", { message }); // Broadcast to all connected clients
    res.json({ success: true, message: "Notification sent" });
});

server.listen(4000, () => {
    console.log("Server running on port 4000");

});


// AI

const GEMINI_API_KEY = "AIzaSyDNmJDzrdHX0pAoXT6p0Zc507yPFlbQjwQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ai", async (req, res) => {
    const prompt = req.body.prompt;
    const result = await model.generateContent(prompt);
    return res.json({ result });
    
});

