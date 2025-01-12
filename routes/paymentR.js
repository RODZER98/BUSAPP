const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/plan', PaymentController.createPlan);
router.get('/plans', PaymentController.listPlans);
router.post('/pay', PaymentController.makePayment);

module.exports = router;