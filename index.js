const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || "4000";

const authRouter = require("./routes/auth.routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`)
})