const Account = require('../models/account'); 



class AccountServices{

    async addAccount(details){
        return await new Account(details).save();
    }
    getAccount(criteria){
        return  Account.findOne(criteria); 
    }
    deleteAccount(criteria){
        return Account.findOneAndDelete(criteria);
    }
    updateAccount(criteria, details){
        return Account.findOneAndUpdate(criteria, details)
    }

}


module.exports = new AccountServices();