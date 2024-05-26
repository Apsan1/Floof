import { Router } from "express";

const router = Router();

router.get("/h", (req, res) => {
    res.send("Welcome to the Home Page!");
    }
);

export default router;