import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPaymentIntent, handleWebhook } from "../controllers/payment.conroller.js";

const router = Router();

router.post("/create-intent", protectRoute, createPaymentIntent);

router.post("/webhook", handleWebhook);

export default router;