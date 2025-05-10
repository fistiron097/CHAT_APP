# ChatCord

ChatCord is a full-stack, real-time chat application built using Node.js, Express.js, and Socket.IO, designed to emulate the core functionality of modern chat platforms like Discord. It supports dynamic multi-user communication across isolated chat rooms ("lobbies") and leverages event-driven architecture to enable low-latency, bidirectional message flow between clients and the server.

🔧 Key Features
🔁 Real-Time WebSocket Communication: Uses Socket.IO to establish persistent connections between client and server for instantaneous message delivery without polling.

🧠 User State & Session Management: Tracks individual users joining/leaving chat rooms using in-memory data structures, enabling real-time user lists and presence awareness within each lobby.

🗨️ Room-Based Messaging Architecture: Each chat room functions as an isolated namespace, ensuring messages are broadcast only to users within the same room, minimizing unnecessary data transfer and improving scalability.

🕒 Timestamped Chat Logs: Integrates Moment.js to attach formatted timestamps to every message, improving readability and enabling potential future logging and archival.

📥 Lobby Join Interface: Frontend form takes user credentials (name and room), establishes a socket connection, and emits user metadata to the server for registration into the respective room.

📡 Event-Driven Backend Architecture: Implements custom server-side event handlers for join, message, disconnect, etc., to maintain consistent state and emit appropriate updates to clients in real-time.

🧪 Modular Codebase: The project follows clean, modular separation of concerns between route handling, socket logic, and utility functions, improving maintainability and scalability.

📈 Future-Ready Design: The architecture allows for easy integration of advanced features such as:

Persistent message storage via MongoDB or PostgreSQL

JWT-based user authentication

Typing indicators and message receipts

Admin/moderation controls

Media sharing and file uploads


🛠️ Tech Stack

| Layer            | Technology                                            |
| ---------------- | ----------------------------------------------------- |
| Backend Runtime  | [Node.js](https://nodejs.org/)                        |
| Web Framework    | [Express.js](https://expressjs.com/)                  |
| Real-Time Engine | [Socket.IO](https://socket.io/)                       |
| Date Handling    | [Moment.js](https://momentjs.com/)                    |
| Frontend         | HTML, CSS, JavaScript                                 |
| Deployment       | (Optional) Can be hosted on Heroku, Render, or Vercel |
