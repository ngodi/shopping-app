const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || "4000";

const authRouter = require("./routes/auth.routes");
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", authRouter);

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`)
})