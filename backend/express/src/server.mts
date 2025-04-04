import express from 'express';
import rootRouter from './routes/index.mjs';

const server = express();

// middlewares
server.use(express.json());

// root router
server.use("/api", rootRouter);


// listen to the 5000 port
server.listen(5000, () => console.log("Server is running!"));