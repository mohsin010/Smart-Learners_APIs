const FreelncerService = require('../models/freelancerServices')



class FreelanceServices {
    createService(details) {
        return new FreelncerService(details).save()
    }

    updateService(criteria, details) {
        return FreelncerService.findOneAndUpdate(criteria, details);
    }


    getOneService(criteria) {
        return FreelncerService.findOne(criteria);
    }

    getAllServices(criteria) {
        return FreelncerService.find(criteria);
    }

    deleteOneService(criteria) {
        return FreelncerService.findOneAndDelete(criteria);
    }
    deleteAllServices(criteria) {
        return FreelncerService.deleteMany(criteria);
    }
    searchService(criteria) {
        return FreelncerService.find({ $text: { $search: criteria.keyword } });
    }

};

module.exports = new FreelanceServices();