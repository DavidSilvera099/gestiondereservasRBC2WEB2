import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomByCode,
  updateRoom,
} from "../controllers/roomController.js";

const router = Router();

// Rutas para la gestión de habitaciones
router.get("/", getAllRooms); // Obtener todas las habitaciones
router.get("/:id", getRoomByCode); // Obtener una habitación por ID
router.post("/", createRoom); // Crear una nueva habitación
router.put("/:id", updateRoom); // Actualizar una habitación existente
router.delete("/:id", deleteRoom); // Eliminar una habitación

export default router;
