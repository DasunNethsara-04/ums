import { Router, Request, Response } from "express";

const userRouter = Router();

// demo user router
userRouter.get("/", (_: Request, res: Response) => {
    res.status(200).json({ "message": "Hello from users" });
})



export default userRouter;