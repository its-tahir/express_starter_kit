const express = require('express')
const { getBootcamps, getSingleBootcamp, addBootcamp, updateBootcamps, deleteBootcamp } = require('../controllers/bootcamps')

const router = express.Router()

router.route('/').get(getBootcamps).post(addBootcamp)

router.route('/:id').get(getSingleBootcamp).put(updateBootcamps).delete(deleteBootcamp)

module.exports = router