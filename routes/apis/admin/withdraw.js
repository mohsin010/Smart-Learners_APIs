const express = require('express');
const  router = express.Router();

const WithdrawController = require('../../../controllers/admin/withdraw');


router.post('/approverequest', WithdrawController.approveWithdrawRequest);
router.post('/getpreviouswithdraws', WithdrawController.getAllPreviousWithdrawRequests);
router.post('/getwithdrawrequests', WithdrawController.getAllPendingWithdrawRequests);



module.exports = router;
