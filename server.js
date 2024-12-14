const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoiceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/invoice', invoiceRoutes);  // Ajouter la route pour les factures
app.use('/api/payment', paymentRoutes);  // Routes pour le paiement

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
