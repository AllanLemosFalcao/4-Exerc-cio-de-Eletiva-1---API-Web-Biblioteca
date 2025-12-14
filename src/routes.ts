import { Router } from "express";
import { LivroController } from "./controller/LivroController";

const router = Router();
const controller = new LivroController();

// rptas
router.post("/livros", (req, res) => controller.create(req, res));
router.get("/livros", (req, res) => controller.getAll(req, res));
router.get("/livros/:id", (req, res) => controller.getById(req, res));
router.put("/livros/:id", (req, res) => controller.update(req, res));
router.delete("/livros/:id", (req, res) => controller.delete(req, res));

export default router;