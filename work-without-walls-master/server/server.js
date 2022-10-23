// require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");
const cors = require("cors");
const redis = require("./redis/redis-client");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7900;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//routes
const routes = require("./routes/api");
const auth = require("./routes/auth");
const home = require("./routes/Home");
const admin = require("./routes/admin");
const jobs = require("./routes/job.routes");

mongoose.connect("mongodb://localhost/fyp", {});
mongoose.connection.on("connected", () => {
  console.log("Mongose is connected");
});

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
app.listen(PORT, console.log(`server is starting at ${PORT}`));
