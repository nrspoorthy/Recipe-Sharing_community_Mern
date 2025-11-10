import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // for local testing (Vite default port)
  "https://recipe-sharing-frontend.vercel.app", // your deployed frontend domain (update this after Vercel deploy)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed from this origin: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect DB
(async () => {
  try {
    console.log("Connecting to DB...");
    await connectdb();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
})();

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

// ✅ (Optional) Serve frontend only if you plan full-stack deploy on same Render
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const frontendPath = path.join(__dirname, "../../dist");
// app.use(express.static(frontendPath));
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.resolve(frontendPath, "index.html"));
// });

app.listen(port, () => console.log(`Server running on port ${port}`));