import { Router } from "express";
import userRouter from "./users.mjs";
import authRouter from "./auth.mjs";

const rootRouter = Router();

// routes
rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);


export default rootRouter;