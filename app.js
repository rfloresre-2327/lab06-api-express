// app.js
const express = require('express');
const cursoRoutes = require('./routes/cursoRoutes');
const app = express();

// Middleware obligatorio 1: Procesamiento JSON
app.use(express.json());

// Middleware obligatorio 2: Auditoría (Logger)
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} en ${req.originalUrl} - Tiempo de respuesta: ${duration}ms`);
    });
    next();
});

// Rutas
app.use('/api/cursos', cursoRoutes);

// Middleware obligatorio 3: Manejo de Errores Global (Código 500)
app.use((err, req, res, next) => {
    console.error('Error detectado:', err.stack);
    res.status(500).json({ 
        status: 'error', 
        message: 'Error interno del servidor' 
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Express corriendo en el puerto ${PORT}`);
});