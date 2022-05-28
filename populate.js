require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProudcts = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProudcts);
        console.log("Success!!!!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
