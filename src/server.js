const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authController = require('./controllers/authController');
const procesoController = require('./controllers/procesoController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del Frontend
app.use(express.static(path.join(__dirname, '../public')));

// Endpoints API REST
app.post('/api/v1/auth/login', authController.login);
app.post('/api/v1/auth/register', authController.register);

app.get('/api/v1/procesos', procesoController.getProcesos);
app.post('/api/v1/procesos', procesoController.createProceso);

app.get('/api/v1/cms/anuncios', procesoController.getAnunciosCMS);
app.post('/api/v1/cms/anuncios', procesoController.createAnuncioCMS);

// Fallback para SPA / Rutas HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});