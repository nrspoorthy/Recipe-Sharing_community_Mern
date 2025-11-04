import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    console.log("Connecting to DB...");
    await connectdb();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
})();

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 