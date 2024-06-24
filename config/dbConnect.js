const { default: mongoose } = require("mongoose");

const dbConnect = ( ) => {
	try {
    const conn = mongoose.connect("mongodb: url/databse");
  } catch (error) {
    console.log(error);
  }
 };

 module.exports = dbConnect;