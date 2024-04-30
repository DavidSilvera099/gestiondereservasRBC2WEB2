import {pool} from '../config/pool.js';

export const getAllBookings = async (req, res) => {
    try {
        const [bookings, fields] = await pool.query('SELECT * FROM bookings');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const [booking, fields] = await pool.query('SELECT * FROM bookings WHERE idbookings = ?', [req.params.id]);
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
        const [result] = await pool.query('INSERT INTO bookings (codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?, ?, ?)', [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida]);
        res.status(201).json({ message: 'Booking created', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida } = req.body;
        const [result] = await pool.query('UPDATE bookings SET nombre_cliente = ?, telefono_cliente = ?, fecha_reservación = ?, fecha_entrada = ?, fecha_salida = ? WHERE idbookings = ?', [nombre_cliente, telefono_cliente, fecha_reservación, fecha_entrada, fecha_salida, req.params.id]);
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
        const [result] = await pool.query('DELETE FROM bookings WHERE idbookings = ?', [req.params.id]);
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
        const [booking, fields] = await pool.query(`
            SELECT *
            FROM bookings
            JOIN rooms  ON rooms.codigo_habitacion = bookings.idbookings
            WHERE bookings.idbookings = ?`, [req.params.id]);
        if (booking.length === 0) {
            return res.status(404).json({ message: 'Detailed booking information not found' });
        }
        res.json(booking[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
