const Bootcamp = require('../models/Bootcamps')
const Course = require('../models/Course')
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')

//@desc         get all bootcamps
//@route        /api/v1/bootcamps
//@access       public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//@desc         get single bootcamp
//@route        /api/v1/bootcamps/:id
//@access       public
exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {
    console.log('req.user: ', req.user);
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
    // Add user to req, body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `The user with ID ${req.user.id} has already published a bootcamp`,
                400
            )
        );
    }

    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })

})

//@desc         update single bootcamp
//@route        /api/v1/bootcamps/:id
//@access       public
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this bootcamp`,
                401
            )
        );
    }

    bootcamp = await Bootcamp.findOneAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: bootcamp });

})

//@desc         delete single bootcamps
//@route        /api/v1/bootcamps/:id
//@access       public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    // Manually delete associated courses
    await Course.deleteMany({ bootcamp: req.params.id });

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this bootcamp`,
                401
            )
        );
    }

    // Delete the bootcamp
    await bootcamp.deleteOne();

    res.status(200).json({ success: true, data: {} });
});