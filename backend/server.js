import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// ✅ CORS fix: Add allowed methods + headers
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://recipe-sharing-community-mern-lp98.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ✅ Connect MongoDB
connectdb()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Recipe Sharing Backend is running 🚀");
});

// ✅ Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
