const axios = require('axios');
const config = require('../config/config');

exports.createInvoice = async (amount, customer_name, customer_email, phone_number) => {
  const invoiceData = {
    amount: amount,
    currency: "XOF",
    customer_name: customer_name,
    customer_email: customer_email,
    phone_number: phone_number,
    description: "Recharge de compte XBet notre plateforme"
  };

  const response = await axios.post(`${config.PAYDUNYA_API_URL}/checkout-invoice/create`, invoiceData, {
    headers: {
      'PAYDUNYA-MASTER-KEY': config.PAYDUNYA_MASTER_KEY,
      'PAYDUNYA-PRIVATE-KEY': config.PAYDUNYA_PRIVATE_KEY
    }
  });

  return response.data.token; // Retourne le token de la facture
};

exports.initiateSoftPay = async (invoiceToken, paymentMethod) => {
  // Construire la donnée de paiement en fonction du mode de paiement
  let paymentData = {
    customer_name: "John Doe",
    customer_email: "john.doe@example.com",
    phone_number: "778676477",
    invoice_token: invoiceToken,
    api_type: "QRCODE"
  };

  let paymentUrl = '';

  if (paymentMethod === 'tmoney') {
    // Pour TMoney
    paymentUrl = `${config.PAYDUNYA_SOFTPAY_URL}/t-money-togo`;
  } else if (paymentMethod === 'moov') {
    // Pour Moov
    paymentUrl = `${config.PAYDUNYA_SOFTPAY_URL}/moov-togo`;
  }

  if (!paymentUrl) {
    throw new Error('Méthode de paiement inconnue');
  }

  const response = await axios.post(paymentUrl, paymentData, {
    headers: {
      'PAYDUNYA-MASTER-KEY': config.PAYDUNYA_MASTER_KEY,
      'PAYDUNYA-PRIVATE-KEY': config.PAYDUNYA_PRIVATE_KEY
    }
  });

  return response.data;  // Retourne la réponse de PayDunya (QR code ou lien de paiement)
};
