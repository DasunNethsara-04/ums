import express from "express";
import cors from 'cors'
import rootRouter from "./routes/index.mjs";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// root router
app.use("/api", rootRouter);


app.listen(5000, () => console.log("Server is running!"));