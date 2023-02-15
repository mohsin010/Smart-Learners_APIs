const express = require('express');
const router = express.Router();


const ServiceOrderController = require('../../../controllers/freelancer/order');
 
router.post('/getorder', ServiceOrderController.getOneOrder);
router.post('/inprocessorders', ServiceOrderController.getInProcessOrders);
router.post('/completedorders', ServiceOrderController.getCompletedOrders);
router.post('/cancelledorders', ServiceOrderController.getCancelledOrders);
router.post('/getneworders', ServiceOrderController.getNewOrders);

router.post('/dashboard', ServiceOrderController.dashboard);



module.exports = router;