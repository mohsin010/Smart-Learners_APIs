const express = require('express');
const router = express.Router();

const AuthRoutes = require('./auth');
const ServicesRoute = require('./services'); 
const FreelancerRoutes = require('./freelancer')
const WithdrawRoutes = require('./withdraw');
const OrderRoutes = require('./order');
const MessagingRoutes = require('./messaging');

router.use('/auth', AuthRoutes); 
router.use('/freelancer', FreelancerRoutes);  
router.use('/services', ServicesRoute);  
router.use('/withdraw', WithdrawRoutes);  
router.use('/orders', OrderRoutes);  
router.use('/messaging', MessagingRoutes);  


 
  
module.exports = router; 
