import { app } from "./app.js";
import { config } from "dotenv";
import connectDB from "./config/database.js";
connectDB();
config({ path: "config/config.env" });
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(
    chalk.underline.red(
      `erorr ${err.message}..shutting down die to unhandled excepto=ion`
    )
  );
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(
    chalk.underline.red(
      `error: ${err.message}..shutting down die to unhandled promise rejevtijin`
    )
  );
  server.close(() => {
    process.exit(1);
  });
});
