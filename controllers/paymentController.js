const paydunyaService = require('../services/paydunyaService');
const config = require('../config/config');

exports.initiatePayment = async (req, res) => {
  try {
    const { amount, customer_name, customer_email, phone_number, payment_method } = req.body;

    // Créer la facture et obtenir le token
    const invoiceToken = await paydunyaService.createInvoice(amount, customer_name, customer_email, phone_number);
    
    // Initialiser le paiement en fonction de la méthode choisie
    const paymentResponse = await paydunyaService.initiateSoftPay(invoiceToken, payment_method);
    
    // Retourner la réponse (QR code ou lien de paiement)
    res.json(paymentResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'initiation du paiement' });
  }
};
