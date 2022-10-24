// require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");
const cors = require("cors");

const { createServer } = require("http");
const redis = require("./redis/redis-client");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
require("dotenv").config();

const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8,
});

const PORT = process.env.PORT || 7900;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* Sockets */

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    console.log(senderId, receiverId, text);
    console.log(user);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    io.emit("getUsers", users);
  });
});

//routes
const routes = require("./routes/api");
const auth = require("./routes/auth");
const home = require("./routes/Home");
const admin = require("./routes/admin");
const jobs = require("./routes/job.routes");
const dbConnection = require("./database/connection");

dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));

app.use(morgan("tiny"));

app.use("/home", home);
app.use("/api", routes);
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/Job", jobs);

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
server.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
