
const CourseCategoryService = require('../../services/degreeCategory');
const SubjectServices = require('../../services/degree');

const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const message = require('../../common/messages');

class CourseCategoryController {

    async getAllCategories(req, res) {
        try {
            let allCategories = await CourseCategoryService.getAllCategories();
            res.status(200).send(ResponseService.success({ categories: allCategories }));
        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }
    async getAllDegreesSubjects(req, res) {
        try {
            let allCategories = [];
            let getallDegrees = await SubjectServices.getAllDegrees();
            // if (getallDegrees) {
            //     allCategories.push(getallDegrees);
            // }
            // let getAllSubjects = await SubjectServices.getAllSubjects();
            // if (getAllSubjects) {
            //     allCategories.push(getAllSubjects);
            // }

            res.status(200).send(ResponseService.success({ categories: getallDegrees }));
        } catch (e) {
            return res.status(200).send(ResponseService.failure(e));
        }
    }


}


module.exports = new CourseCategoryController();