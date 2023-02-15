
const CourseOrderService = require('../../services/course_order');
const CustomerrService = require('../../services/customer');
const CourseService = require('../../services/course');

const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');



class OrdersController {
    async dashboard(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.instructor_id) throw new apiError.ValidationError('instructor id', message.ID_REQUIRED);

            let criteria = {
                instructor_id: data.instructor_id,

            }


            let allOrders = await CourseOrderService.getCourseSales(criteria);
            let getallOrders = []
            if (allOrders.length > 0) {
                let totalOrder = 0
                let totalEarning = 0;
                let totalDiscount = 0;

                for (let i = 0; i < allOrders.length; i++) {
                    for (let j = 0; j < allOrders[i].courses.length; j++) {
                        if (allOrders[i].courses[j].institute_id == data.institute_id) {
                            totalEarning += allOrders[i].courses[j].price;
                            totalOrder++
                        }
                        // console.log(allOrders[i].courses[j].id.toString())  

                        let course = await CourseService.getCourse({ _id: mongoose.Types.ObjectId(allOrders[i].courses[j].course_id) })
                        if (course) {
                            let total_price = course.price.origional_amount
                            let discunt_price = course.price.discount_price
                            let discount = total_price - discunt_price
                            totalDiscount = totalDiscount + discount
                        }
                    }
                }
                getallOrders.push({ 'total_order': totalOrder });
                getallOrders.push({ 'total_earnings': totalEarning })
                getallOrders.push({ 'total_discount': totalDiscount })
            }


            return res.status(200).send(ResponseService.success({ order: getallOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }

    }
    async getEnrolledStudents(req, res) {
        try {
            let data = Object.assign({}, req.body);
            if (!data.instructor_id) throw new apiError.ValidationError('instructor id', message.ID_REQUIRED);

            let criteria = {
                instructor_id: data.instructor_id,

            }


            let allOrders = await CourseOrderService.getCourseSales(criteria);
            let allCustomers = []
            if (allOrders.length > 0) {
                for (let i = 0; i < allOrders.length; i++) {
                    let customer = await CustomerrService.getCustomer({ _id: allOrders[i].customer_id })
                    allCustomers.push(customer)
                }
            }


            return res.status(200).send(ResponseService.success({ order: allCustomers }));



        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));

        }
    }
    async getOrders(req, res) {
        try {
            let data = Object.assign({}, req.body);

            if (!data.instructor_id) throw new apiError.ValidationError('instructor id ', message.ID_REQUIRED);

            let criteria = {
                instructor_id: data.instructor_id,

            }


            let allOrders = await CourseOrderService.getCourseSales(criteria);
            let getallOrders = []
            if (allOrders.length > 0) {
                for (let i = 0; i < allOrders.length; i++) {
                    let customer = await CustomerrService.getCustomer({ _id: allOrders[i].customer_id })
                    let order = allOrders[i].toJSON();
                    order.customer_name = customer.name;
                    order.customer_picture = customer.picture;
                    getallOrders.push(order)
                }
            }


            return res.status(200).send(ResponseService.success({ order: getallOrders }));


        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }

    }
}

module.exports = new OrdersController()