const express = require('express')
const { getBootcamps, getSingleBootcamp, addBootcamp, updateBootcamps, deleteBootcamp } = require('../controllers/bootcamps')

// includes other resource
const courseRouter = require('./courses')
const Bootcamp = require('../models/Bootcamps');

const router = express.Router()

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// reroute into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, addBootcamp)

router
    .route('/:id')
    .get(getSingleBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamps)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);


module.exports = router