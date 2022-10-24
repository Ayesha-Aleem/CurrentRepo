const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://soban:msoban123@cluster0.ln9ys.mongodb.net/ayesha",
        {
          connectTimeoutMS: 20000,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("✓", "Db Connected"))
      .catch((error) => console.log("error"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
