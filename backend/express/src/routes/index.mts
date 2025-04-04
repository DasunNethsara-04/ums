import { Router, Request, Response } from "express";
import userRouter from "./users.mjs";

const rootRouter: Router = Router();

// include the routers
rootRouter.use("/users", userRouter);

// default endpoint (for testing)
rootRouter.get("/test", (_: Request, res: Response): void => {
    res.status(200).json({ "message": "Hello World" });
});

export default rootRouter;