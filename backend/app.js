const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');
const dotenv = require("dotenv") 
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;

app.use(cors()) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config()

mongoose.set("strictQuery", false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("mongoDB Connected")
    } catch (error) {
        throw error;
    }
}

app.use('/api/books', booksRoutes);

app.listen(port, () => {
    connect()
  console.log(`Server is running on port ${port}`);
});
