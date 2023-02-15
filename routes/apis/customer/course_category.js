const express = require('express');
const router = express.Router();

const CourseCategoryController = require('../../../controllers/customer/course_categories');

router.post('/getCategories', CourseCategoryController.getAllCategories);
router.post('/getdegreessubjects', CourseCategoryController.getAllDegreesSubjects);






module.exports = router