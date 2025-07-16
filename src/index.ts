import express from "express";
import cafeRoutes from "./routes/cafeRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", cafeRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to the Node.js + TypeScript API!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
