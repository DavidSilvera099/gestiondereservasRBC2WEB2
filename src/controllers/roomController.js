import {pool} from '../config/db.js'; 

export const getAllRooms = async (req, res) => {
    try {
        const [rooms, fields] = await pool.query('SELECT * FROM rooms');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoomByCode = async (req, res) => {
    try {
        const [room, fields] = await pool.query('SELECT * FROM rooms WHERE codigo_habitacion = ?', [req.params.id]);
        if (room.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRoom = async (req, res) => {
    try {
        const { número, tipo, valor } = req.body;
        const [result] = await pool.query('INSERT INTO rooms (número, tipo, valor) VALUES (?, ?, ?)', [número, tipo, valor]);
        res.status(201).json({ message: 'Room created', roomId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { número, tipo, valor } = req.body;
        const [result] = await pool.query('UPDATE rooms SET número = ?, tipo = ?, valor = ? WHERE codigo_habitacion = ?', [número, tipo, valor, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room updated', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        await pool.query('DELETE FROM bookings WHERE codigo_habitacion = ? ', [id])
        const [result] = await pool.query('DELETE FROM rooms WHERE codigo_habitacion = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted', affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
