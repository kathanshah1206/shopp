import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kathan:kathan@cluster0.gljtc1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        // useCreateIndex: true,
      }
    );
    console.log(process.env.MONGO_URI);
    console.log(
      chalk.underline.cyan(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
