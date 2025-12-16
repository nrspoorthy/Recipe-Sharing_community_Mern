import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";



const app = express();
const port = process.env.PORT || 3001;


const allowedOrigins = [
  "http://localhost:5173",
  "https://recipe-sharing-community-mern-maind.vercel.app",
];


app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use("/uploads", express.static("uploads"));
app.use(express.json());


connectdb()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/recipes", recipeRoutes);



app.get("/", (req, res) => {
  res.send("Recipe Sharing Backend is running");
});


app.listen(port, () => console.log(`Server running on port ${port}`));
