const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Route pour créer une facture
router.post('/create', invoiceController.createInvoice);

module.exports = router;
