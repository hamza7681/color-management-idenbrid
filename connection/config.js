const mongoose = require("mongoose");
const db = process.env.DB_URL;

exports.connection = async () => {
  await mongoose
    .connect(db)
    .then(() => console.log("Database connected"))
    .catch((e) => console.log("Connection Failed", e));
};
