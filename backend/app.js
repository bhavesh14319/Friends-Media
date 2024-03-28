const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");




dotenv.config();
app.use(require("cookie-parser")())


// app.use(cors());

let allowedDomains = ['https://friends-media.vercel.app', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);
     
        if (allowedDomains.indexOf(origin) === -1) {
          var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
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