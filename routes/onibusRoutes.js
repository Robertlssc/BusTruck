import { Router } from "express";

import { getOnibus, postOnibus, buscarOnibus } from "../controllers/onibusController.js"

const router = Router();

router.get("/", getOnibus);
router.post("/criar", postOnibus);
router.get("/:id", buscarOnibus);

export default router;
