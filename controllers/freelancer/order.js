const freelancerService = require('../../services/freelancer');
const customerService = require('../../services/customer')
const ServiceOrder = require('../../services/service_order');
const mongoose = require('mongoose');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class FreelancerServiceController {


    async getOneOrder(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.order_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                _id: data.order_id,
            }

            let getOneOrders = await ServiceOrder.getOrder(criteria);
            let response = Object.assign({}, getOneOrders.toJSON());

            let customer = await customerService.getCustomer({ _id: getOneOrders.customer_id })

            response.customer_name = customer.name
            response.customer_image = customer.picture


            return res.status(200).send(ResponseService.success({ order: response }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getInProcessOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);
            let orders = []

            if (!data.freelancer_id) throw new apiError.ValidationError('Freelancer Id', message.ID_REQUIRED);

            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 2
            }


            let allOrders = await ServiceOrder.getAllOrders(criteria);
            let getAllOrders = []
            for (let i = 0; i < allOrders.length; i++) {
                let resp = Object.assign({}, allOrders[i].toJSON());
                let customer = await customerService.getCustomer({ _id: allOrders[i].customer_id })
                resp.customer_name = customer.name
                resp.customer_image = customer.picture
                getAllOrders.push(resp)
            }



            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getNewOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.freelancer_id) throw new apiError.ValidationError('Freelancer Id', message.ID_REQUIRED);

            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 1
            }


            let allOrders = await ServiceOrder.getAllOrders(criteria);
            let getAllOrders = []
            for (let i = 0; i < allOrders.length; i++) {
                let resp = Object.assign({}, allOrders[i].toJSON());
                let customer = await customerService.getCustomer({ _id: allOrders[i].customer_id })
                resp.customer_name = customer.name
                resp.customer_image = customer.picture
                getAllOrders.push(resp)
            }

            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async getCompletedOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.freelancer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 3
            }


            let allOrders = await ServiceOrder.getAllOrders(criteria);
            let getAllOrders = []
            for (let i = 0; i < allOrders.length; i++) {
                let resp = Object.assign({}, allOrders[i].toJSON());
                let customer = await customerService.getCustomer({ _id: allOrders[i].customer_id })
                resp.customer_name = customer.name
                resp.customer_image = customer.picture
                getAllOrders.push(resp)
            }
            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getCancelledOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.freelancer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 3
            }


            let allOrders = await ServiceOrder.getAllOrders(criteria);
            let getAllOrders = []
            for (let i = 0; i < allOrders.length; i++) {
                let resp = Object.assign({}, allOrders[i].toJSON());
                let customer = await customerService.getCustomer({ _id: allOrders[i].customer_id })
                resp.customer_name = customer.name
                resp.customer_image = customer.picture
                getAllOrders.push(resp)
            }
            return res.status(200).send(ResponseService.success({ order: getAllOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
    async dashboard(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.freelancer_id) throw new apiError.ValidationError('service id', message.ID_REQUIRED);

            let criteria = {
                freelancer_id: data.freelancer_id,
                status: 3
            }


            let allOrders = await ServiceOrder.getAllOrders(criteria);
            let getallOrders = []
            if (allOrders.length > 0) {
                let totalOrder = allOrders.length;
                let totalEarning = 0;
                getallOrders.push({ 'completed_orders': totalOrder });
                for (let i = 0; i < allOrders.length; i++) {
                    totalEarning += allOrders[i].price;
                }
                getallOrders.push({ 'total_earnings': totalEarning })
            }
            let criteria2 = {
                freelancer_id: data.freelancer_id
            }
            let totalOreders = await ServiceOrder.getAllOrders(criteria2);
            // totalOreders = totalOreders.length
            getallOrders.push({ 'total_orders': totalOreders.length })


            return res.status(200).send(ResponseService.success({ order: getallOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }

    }
}


module.exports = new FreelancerServiceController();