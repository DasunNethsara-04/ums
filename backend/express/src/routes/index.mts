import { Router, Request, Response } from "express";
import userRouter from "./users.mjs";

const rootRouter = Router();

// include the routers
rootRouter.use("/users", userRouter);

// default endpoint (for testing)
rootRouter.get("/", (_: Request, res: Response) => {
    res.status(200).json({ "message": "Hello World" });
});

export default rootRouter;