import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
(async () => {
  try {
    console.log("Connecting to DB...");
    await connectdb();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
})();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const frontendPath = path.join(__dirname, "../frontend/dist");


app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});




// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
