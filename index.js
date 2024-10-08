const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || "4000";

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const adminUserRouter = require("./routes/admin/user.routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin/users", adminUserRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`)
})