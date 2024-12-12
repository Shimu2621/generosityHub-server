const mongoose = require("mongoose");
require('dotenv').config()

const conectionToDB = async () => {
   await mongoose.connect(process.env.DB_URI)
   .then(() => console.log("Pinged your deployment. You successfully connected to MongoDB!"))
   .catch((error) => console.log(error)) 
}

module.exports = conectionToDB;