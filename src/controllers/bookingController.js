import db from '../config/db.js';

export const getAllBookings = async (req, res) => {
    try {
        const [bookings, fields] = await db.query('SELECT * FROM reservas');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const [booking, fields] = await db.query('SELECT * FROM reservas WHERE código = ?', [req.params.id]);
        if (booking.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBooking = async (req, res) => {
    try {
        const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida } = req.body;
        const [result] = await db.query('INSERT INTO reservas (codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?, ?, ?)', [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida]);
        res.status(201).json({ message: 'Booking created', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida } = req.body;
        const [result] = await db.query('UPDATE reservas SET nombre_cliente = ?, telefono_cliente = ?, fecha_reservación = ?, fecha_entrada = ?, fecha_salida = ? WHERE código = ?', [nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking updated', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM reservas WHERE código = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// No has especificado lo que hace bookingCompleteById, asumiendo que devuelve información detallada de la reserva.
export const bookingCompleteById = async (req, res) => {
    try {
        // Esta es una consulta de ejemplo, debes reemplazarla con la consulta real que necesitas.
        const [booking, fields] = await db.query(`
            SELECT r.*, h.tipo, h.valor
            FROM reservas r
            JOIN habitaciones h ON r.código_habitación = h.código
            WHERE r.código = ?`, [req.params.id]);
        if (booking.length === 0) {
            return res.status(404).json({ message: 'Detailed booking information not found' });
        }
        res.json(booking[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
