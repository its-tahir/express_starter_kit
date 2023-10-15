const Bootcamp = require('../models/Bootcamps')

//@desc         get all bootcamps
//@route        /api/v1/bootcamps
//@access       public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

//@desc         get single bootcamp
//@route        /api/v1/bootcamps/:id
//@access       public
exports.getSingleBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            return res.status(400).json({ success: false, msg: 'Id not exists!' })
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

//@desc         add bootcamps
//@route        /api/v1/bootcamps
//@access       public
exports.addBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({ success: true, data: bootcamp })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

//@desc         update single bootcamp
//@route        /api/v1/bootcamps/:id
//@access       public
exports.updateBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!bootcamp) {
            return res.status(400).json({ success: false, msg: 'Id not exists!' })
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

//@desc         delete single bootcamps
//@route        /api/v1/bootcamps/:id
//@access       public
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if (!bootcamp) {
            return res.status(400).json({ success: false, msg: 'Id not exists!' })
        }
        res.status(200).json({ success: true, data: {} })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}
