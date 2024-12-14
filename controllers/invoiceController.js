const invoiceService = require('../services/invoiceService');

exports.createInvoice = async (req, res) => {
  try {
    const { amount, customer_name, customer_email, phone_number } = req.body;

    // Appel à la fonction pour créer la facture
    const invoiceData = await invoiceService.createInvoice(amount, customer_name, customer_email, phone_number);
    
    // Si la facture est créée avec succès, retourne le token et les détails
    res.json({
      success: true,
      message: 'Facture créée avec succès',
      data: invoiceData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la facture'
    });
  }
};
