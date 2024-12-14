const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route pour initier un paiement avec la méthode choisie
router.post('/initiate-payment', paymentController.initiatePayment);

module.exports = router;
