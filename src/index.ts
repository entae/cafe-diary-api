import express from "express";
import { connectToDatabase } from "./services/database.service";
import { cafesRouter } from "./routes/cafes.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", cafesRouter);

connectToDatabase()
  .then(() => {
    app.use("/cafes", cafesRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
