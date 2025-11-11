import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://recipe-sharing-community-mern-npqd.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());


connectdb()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection failed:", err));


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);


app.get("/", (req, res) => {
  res.send("Recipe Sharing Backend is running");
});


app.listen(port, () => console.log(`Server running on port ${port}`));
