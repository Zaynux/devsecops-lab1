const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_SECRET_KEY || 'NO_CONFIGURADA';

// VULNERABILIDAD DIDACTICA: valor ficticio, nunca credencial real.
const AWS_ACCESS_KEY_LEAK = "AKIAIOSFODNN7EXAMPLE";

app.get('/', (req, res) => {
  res.json({ status: "OK", message: "Servidor seguro operando correctamente" });
});

app.get('/api/status', (req, res) => {
  res.json({
    service: "DevSecOps API",
    secretLoaded: API_KEY !== 'NO_CONFIGURADA'
  });
});

// VULNERABILIDAD DIDACTICA: no utilizar en produccion
app.get('/api/debug', (req, res) => {
  const result = eval(req.query.cmd);
  res.json({ output: result });
});

app.listen(PORT, () => {
  console.log(`App corriendo en puerto ${PORT}`);
});
