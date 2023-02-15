const express = require('express');
const router = express.Router();
const path = require("path").resolve;

const CourseController = require('../../../controllers/instructor/course');

const Upload = require('../../../common/multer'); 


router.post('/addcourse', Upload.any(), CourseController.addCourse);
router.post('/getcourse', CourseController.getCourse);
router.post('/updatecourse', CourseController.updateCourse);
router.post('/get_all', CourseController.get_all); 



module.exports = router;
