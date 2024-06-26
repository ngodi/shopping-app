const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
	try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("mongodb connected successfully");
    }
  } catch (error) {
    console.log(error, "error connecting db");
  }
 };

 module.exports = dbConnect;