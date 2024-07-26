import { Router } from "express";

import { buscarLinha, editarLinha, getLinhas, postLinha } from "../controllers/linhaController.js";

const router = Router();

router.get("/", getLinhas);
router.post("/criar", postLinha);
router.get("/:id", buscarLinha)
router.put("/editar/:id", editarLinha);

export default router;
