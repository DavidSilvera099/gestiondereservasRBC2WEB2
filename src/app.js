import express from 'express';
import roomRoutes from './routes/rooms.js';
import bookingRoutes from './routes/bookings.js';

const app = express();
app.use(express.json());

// Agrega una ruta base para manejar la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido al API de reserva de habitaciones del hotel!');
});

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
