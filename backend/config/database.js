import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kathanshah12062002:kathan@ecomm.xndguem.mongodb.net/?retryWrites=true&w=majority&appName=ecomm",
      {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        // useCreateIndex: true,
      }
    );
    // console.log(process.env.MONGO_URI);
    console.log(
      chalk.underline.cyan(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
