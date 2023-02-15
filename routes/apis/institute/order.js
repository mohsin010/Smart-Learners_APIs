const express = require('express');
const router = express.Router();

const OrderController = require('../../../controllers/institute/orders');


router.post('/dashboard', OrderController.dashboard);
router.post('/getorders', OrderController.getOrders);
router.post('/getenrolled', OrderController.getEnrolledStudents);


   

module.exports = router;
  