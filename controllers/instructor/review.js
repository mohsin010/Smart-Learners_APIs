const ReviewService = require('../../services/review');
const CourseService = require('../../services/course');
const CustomerrService = require('../../services/customer');


const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');


class ReviewController {
    async getReview(req, res) {
        try {
            let data = Object.assign({}, req.body);

            let getCourse = await CourseService.getCourse({ _id: data.course_id });
            if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);
            let criteria = {
                _id: data.course_id
            }
            let review = ReviewService.getReview(criteria);

            return res.status(200).send(ResponseService.success({ review: review }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }

    async getAllReviews(req, res) {

        try {
            let data = Object.assign({}, req.body);
            let criteria  = {}

            if (data.course_id) {
                let getCourse = await CourseService.getCourse({ _id: data.course_id });
                if (!getCourse) throw new apiError.ValidationError('id', message.COURSE_ID);
                criteria = {
                    course_id: data.course_id
                }
            } else { 
                criteria = {
                    instructor_id: data.instructor_id
                }
            }
            let getreview = await ReviewService.getAllReview(criteria);
            let review = []
            if (getreview.length > 0) {
                for (let i = 0; i < getreview.length; i++) {
                    let customer = await CustomerrService.getCustomer({ _id: getreview[i].customer.customer_id })
                    let order = getreview[i].toJSON();
                    order.customer.customer_name = customer.name;
                    order.customer.customer_picture = customer.picture;
                    review.push(order)
                }
            }

            return res.status(200).send(ResponseService.success({ review: review }));
        } catch (e) {
            return res.status(500).send(ResponseService.failure(e));
        }
    }
}

module.exports = new ReviewController();