const WidthdrawServices = require('../../services/withdraw');
const AccountServices = require('../../services/account');
const TransactionServices = require('../../services/transaction');
var stripe = require('stripe')('sk_test_0KziHudfqX3n3AoV3BSWBnw900IGCvE5yH');


const mongoose = require('mongoose');

const apiError = require('../../common/api-errors')
const message = require('../../common/messages')
const ResponseService = require('../../common/response');

class WithdrawController {

    async getAllPendingWithdrawRequests(req, res) {
        try {

            let data = Object.assign({}, req.body)
            let criteria = {
                status: 1
            }

            let getWithdraws = await WidthdrawServices.pendingWithdraws(criteria)
            if (getWithdraws) {
                res.status(200).send(ResponseService.success({ allwithdraws: getWithdraws }))
            } else {
                throw new apiError.ValidationError('No Pending Withdraw Request', message.NOT_FOUND);
            }

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))

        }
    }

    async getAllPreviousWithdrawRequests(req, res) {
        try {

            let data = Object.assign({}, req.body)
            let criteria = {
                status: 1
            }

            let getWithdraws = await WidthdrawServices.previousWithdraws(criteria)
            if (getWithdraws) {
                res.status(200).send(ResponseService.success({ allwithdraws: getWithdraws }))
            } else {
                throw new apiError.ValidationError('No Pending Withdraw Request', message.NOT_FOUND);
            }

        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))

        }
    }

    async approveWithdrawRequest(req, res) {
        try {

            let data = Object.assign({}, req.body)

            let criteria = {
                _id: data.withdraw_id
            }

            let getWithdrawRequest = await WidthdrawServices.getWithdrawRequest(criteria)


            stripe.transfers.create(
                {
                    amount: getWithdrawRequest.amount,
                    currency: 'usd',
                    destination: getWithdrawRequest.acc_number,
                    // transfer_group: 'ORDER_95',
                },
                async function (err, transfer) {
                    // asynchronously called
                    if (transfer) {
                        let details1 = {
                            status: 2
                        }

                        let details = {
                            transaction_id: transfer.balance_transaction,
                            transaction_owner: getWithdrawRequest.withdraw_owner,
                            charges_id: transfer.id,
                            created_stamp: transfer.created,
                            stripe_customer_id: transfer.customer,
                            brand: transfer.payment_method_details.card.brand,
                            fingerprint: transfer.payment_method_details.card.fingerprint,
                            last4: transfer.payment_method_details.card.last4,
                            network: transfer.payment_method_details.card.network,
                            status: transfer.status
                        }
                        let transaction = await TransactionService.addTransaction(details);
                        let approveRequest = await WidthdrawServices.approveWithdraw(criteria, details1)
                        if (approveRequest) {
                            res.status(200).send(ResponseService.success({ approvedwithdraw: approveRequest }))
                        } else {
                            throw new apiError.ValidationError('Withdraw Request Not Found', message.NOT_FOUND);
                        }
                    }else{
                        throw new apiError.ValidationError('Transaction Failled', message.INVALID_REQUEST)
                    }

                }
            );



        } catch (e) {
            return res.status(200).send(ResponseService.failure(e))

        }
    }
}

module.exports = new WithdrawController();