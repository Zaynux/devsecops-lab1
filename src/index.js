const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_SECRET_KEY || 'NO_CONFIGURADA';

app.get('/', (req, res) => {
  res.json({ status: "OK", message: "Servidor seguro operando correctamente" });
});

app.get('/api/status', (req, res) => {
  res.json({
    service: "DevSecOps API",
    secretLoaded: API_KEY !== 'NO_CONFIGURADA'
  });
});

app.listen(PORT, () => {
  console.log(`App corriendo en puerto ${PORT}`);
});
