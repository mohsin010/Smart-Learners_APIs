const express = require('express');
const router = express.Router();

const MessagingController = require('../../../controllers/freelancer/messaaging');



// router.post('/join-chat', MessagingController.joinChat) 
router.post('/auth', MessagingController.auth) 

router.post('/reply', MessagingController.reply)
router.post('/getthread', MessagingController.getThread)
router.post('/getallthreads', MessagingController.getAllThreads) 

module.exports = router


 