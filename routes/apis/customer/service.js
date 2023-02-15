const express = require('express');
const router = express.Router();

const ServiceController = require('../../../controllers/customer/service');

router.post('/getallmainservices', ServiceController.getAllMainServices); 
router.post('/getservicecategories', ServiceController.getServiceCategories);
router.post('/getfreelancerservices', ServiceController.getFreelancerServices);
router.post('/getonefreelancerservice', ServiceController.getOneFreelancerService);
router.post('/searchservice', ServiceController.searchServices);
router.post('/searchfreelancerservice', ServiceController.searchFreelancerServices);


module.exports = router;