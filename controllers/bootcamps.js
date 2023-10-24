const Bootcamp = require('../models/Bootcamps')
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')

//@desc         get all bootcamps
//@route        /api/v1/bootcamps
//@access       public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    // applying filters
    let query;

    // copy req.query
    const reqQuery = { ...req.query }

    // fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit']

    // loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    // create query string
    let queryStr = JSON.stringify(reqQuery);

    // create operators ($gt, $gte....)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // finding resources
    query = Bootcamp.find(JSON.parse(queryStr))

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    // sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);


    // executing query
    const bootcamps = await query

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.advancedResults = {
        success: true,
        count: bootcamps.length,
        pagination,
        data: bootcamps
    };


    res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps })

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
