import { Router } from 'express';
import { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking,  } from '../controllers/bookingController.js';

const router = Router();

// Rutas para la gestión de reservas
router.get('/', getAllBookings);      // Obtener todas las reservas
router.get('/:id', getBookingById);   // Obtener una reserva por ID
router.post('/', createBooking);      // Crear una nueva reserva
router.put('/:id', updateBooking);    // Actualizar una reserva existente
router.delete('/:id', deleteBooking); // Eliminar una reserva

export default router;
