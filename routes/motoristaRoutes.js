import { Router } from "express";

import { buscarMotorista, getMotorista, postMotorista, } from "../controllers/motoristaController.js";

const router = Router();

router.get("/", getMotorista);
router.post("/criar", postMotorista);
router.get("/:id", buscarMotorista);

export default router;
