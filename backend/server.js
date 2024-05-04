import { app } from "./app.js";
import { config } from "dotenv";
import connectDB from "./config/database.js";
connectDB();
config({ path: "config/config.env" });
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
