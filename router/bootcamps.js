const express = require('express')
const { getBootcamps, getSingleBootcamp, addBootcamp, updateBootcamps, deleteBootcamp } = require('../controllers/bootcamps')

// includes other resource
const courseRouter = require('./courses')

const router = express.Router()

// reroute into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route('/').get(getBootcamps).post(addBootcamp)

router.route('/:id').get(getSingleBootcamp).put(updateBootcamps).delete(deleteBootcamp)

module.exports = router