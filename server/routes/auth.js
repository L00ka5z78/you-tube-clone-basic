import express from "express";
import { signup, signin, googleAuth } from "../controllers/auth.js"

const router = express.Router();

// *********create a user *** sign in *** google auth *****

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/google", googleAuth)


export default router;