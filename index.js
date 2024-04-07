const express = require("express");
const connectDB = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/userRoute");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/user",authRouter);

app.listen(PORT, () => {
    console.log(`Sever is running at PORT... ${PORT}`);
})