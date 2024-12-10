import express from "express";
import authRoute from "./routes/authRoute.js"
import journalRoutes from "./routes/journalRoutes.js"
import cors from "cors";

const app = express(); 

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/journal", journalRoutes);

app.listen(3000, () => {
    console.log("backend is listening!");
  });

