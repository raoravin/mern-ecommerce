const express = require("express");
const asyncHandler = require("express-async-handler");
const connectDB = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const generateRefreshToken = require("./config/refreshToken");


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user",authRouter);



app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Sever is running at PORT... ${PORT}`);
})