const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");




dotenv.config();
app.use(require("cookie-parser")())



app.use(cors({
    // origin: "https://friendsmedia.netlify.app",
    origin:"http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
    credentials: true
}))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({limit:"50mb",extended:true }));

//import routes
const userRoutes = require("./Routes/User");
const postRoutes = require("./Routes/Post");


app.use("/api/v1", userRoutes)
app.use("/api/v1", postRoutes)

module.exports = app;