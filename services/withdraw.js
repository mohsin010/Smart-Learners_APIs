const Withdraw = require('../models/withdraw'); 


class WithdrawServices {

    withdrawRequest(details){
        return new Withdraw(details).save(); 
    }
    getWithdrawRequest(criteria){
        return Withdraw.findOne(criteria)
    }
    approveWithdraw(criteria, details){
        return Withdraw.findOneAndUpdate(criteria, details);
    }
    pendingWithdraws(criteria){
        return Withdraw.find(criteria);
    }
    previousWithdraws(criteria){
        return Withdraw.find(criteria);
    }

    // totalBalanceInstitute(criteria){
    //     return Course_Oder.find(criteria);
    // }
    // totalBalanceFreelancer(criteria){
    //     return Service_Order.find(criteria);
    // }
}


module.exports = new WithdrawServices();