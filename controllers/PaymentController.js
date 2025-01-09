const PaymentPlan = require('../models/PaymentPlan');

module.exports = {
  // Crear un nuevo plan de pago
  createPlan: async (req, res) => {
    try {
      const { name, price, trips, duration } = req.body;
      const plan = new PaymentPlan({ name, price, trips, duration });
      await plan.save();
      res.status(201).json({ message: 'Plan creado exitosamente', plan });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el plan', details: err });
    }
  },

  // Listar todos los planes de pago
  listPlans: async (req, res) => {
    try {
      const plans = await PaymentPlan.find();
      res.status(200).json(plans);
    } catch (err) {
      res.status(500).json({ error: 'Error al listar los planes', details: err });
    }
  },

  // Procesar el pago de un plan
  makePayment: async (req, res) => {
    try {
      const { userId, planId } = req.body;
      // Aquí integras la pasarela de pagos (Stripe, PayPal, etc.)
      res.status(200).json({ message: 'Pago procesado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al procesar el pago', details: err });
    }
  },
};