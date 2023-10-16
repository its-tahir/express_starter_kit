const Bootcamp = require('../models/Bootcamps')
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')

//@desc         get all bootcamps
//@route        /api/v1/bootcamps
//@access       public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })

})

//@desc         get single bootcamp
//@route        /api/v1/bootcamps/:id
//@access       public
exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: bootcamp })

})

//@desc         add bootcamps
//@route        /api/v1/bootcamps
//@access       public
exports.addBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })

})

//@desc         update single bootcamp
//@route        /api/v1/bootcamps/:id
//@access       public
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: bootcamp })

})

//@desc         delete single bootcamps
//@route        /api/v1/bootcamps/:id
//@access       public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: {} })
})
