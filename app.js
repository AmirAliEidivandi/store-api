require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const winston = require("winston");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

// error handle
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.send('<h1>Stroe API</h1><a href="/api/v1/products">products route :)</a>');
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// create a logger
const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
    exceptionHandlers: [new winston.transports.File({ filename: "exceptions.log" })],
});

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => logger.info(`server running on port ${PORT}`));
    } catch (error) {
        logger.error(error.message);
    }
};

start();
