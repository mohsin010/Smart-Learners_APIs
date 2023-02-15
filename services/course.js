const Course = require('../models/course');


class CourseService {

    searchCourse(criteria) {

        return Course.find({ $text: {$search: criteria.keyword}});
    }
    createCourse(details) {
        return new Course(details).save()
    }

    getCourse(request) {
        return Course.findOne(request)
    }
    getAllCourse(request) {
        return Course.find(request)
    }
    getManyCourses(criteria) {
        return Course.find(criteria);
    }
    getFeaturedCourses(criteria) {
        return Course.find({ "price.discount_price": { $ne: null } })
    }
    getFilteredCourses(criteria) {
        return Course.find({ $or: [{ degree: criteria.degree }, { subject: criteria.subject }] })
    }

    getAllCourses() {
        return Course.find();
    }

    updateCourse(criteria, details) {
        return Course.findOneAndDelete(criteria, details, { new: true }).save()
    }

    deleteCourse(criteria) {
        return Course.findOneAndDelete(criteria);
    }
}


module.exports = new CourseService();