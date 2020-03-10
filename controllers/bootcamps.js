const bootcampModel = require("../models/Bootcamp.js");
const ErrorHandler = require("../utils/errorHandler.js");
const geocoder = require("../utils/geojsonDecoder.js");
/**
 * @description get all the bootcamps
 * @param route GET /api/v1/bootcamps
 * @param access PUBLIC
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await bootcampModel.find();
    res.status(200).json({
      sucess: true,
      count: bootcamp.length,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description get a single bootcamp
 * @param route GET /api/v1/bootcamps/:id
 * @param access PUBLIC
 */
exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootcampModel.findById(req.params.id);

    //NOTE: if there are two res in same local block add return to res present in contional statement

    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not found at id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      sucess: true,
      data: bootcamp
    });
    console.log(bootcamp);
  } catch (error) {
    next(error);
  }
};

/**
 * @description create a bootcamp
 * @param route POST /api/v1/bootcamps
 * @param access PRIVATE
 */
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootcampModel.create(req.body);

    res.status(201).json({
      sucess: true,
      data: bootcamp
    });
    console.log(bootcamp);
  } catch (error) {
    next(error);
  }
};

/**
 * @description update a the bootcamps
 * @param route PUT /api/v1/bootcamps/:id
 * @param access PRIVATE
 */
exports.updateBookcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootcampModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not found at id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      sucess: true,
      updatedData: bootcamp
    });
    console.log(bootcamp);
  } catch (error) {
    next(error);
  }
};

/**
 * @description delete a the bootcamp
 * @param route DELETE /api/v1/bootcamps/:id
 * @param access PRIVATE
 */
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootcampModel.findOneAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not found at id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      sucess: true,
      deletedData: bootcamp
    });
    console.log(bootcamp);
  } catch (error) {
    next(error);
  }
};

/**
 * @description find bootcamp using zipcode and area in miles
 * @param route GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @param access PRIVATE
 */
exports.findBootcampByLocation = async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  const area = distance / 3963; //in miles
  console.log(lat, long, area);
  try {
    const bootcamp = await bootcampModel.find({
      location: { $geoWithin: { $centerSphere: [[lat, long], area] } }
    });
    res.status(200).json({
      sucess: true,
      count: bootcamp.length,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};
