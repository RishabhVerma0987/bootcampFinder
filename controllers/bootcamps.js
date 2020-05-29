const bootcampModel = require("../models/Bootcamp.js");
const ErrorHandler = require("../utils/errorHandler.js");
const geocoder = require("../utils/geojsonDecoder.js");
const path = require("path");
/**
 * @description get all the bootcamps
 * @param route GET /api/v1/bootcamps
 * @param access PUBLIC
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    res.status(200).json(res.advanceResults);
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
      data: bootcamp,
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
    req.body.user = req.user.id;
    const bootcamp = await bootcampModel.create(req.body);

    res.status(201).json({
      sucess: true,
      data: bootcamp,
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
    let bootcamp = await bootcampModel.findById(req.params.id);

    //make sure bootcamp exists
    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not found at id ${req.params.id}`, 404)
      );
    }

    //make sure the user is owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorHandler(
          `User ${req.user.id} is not authorised to update this bootcamp`,
          401
        )
      );
    }

    bootcamp = await bootcampModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      sucess: true,
      updatedData: bootcamp,
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
    const bootcamp = await bootcampModel.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not found at id ${req.params.id}`, 404)
      );
    }
    //make sure the user is owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorHandler(
          `User ${req.user.id} is not authorised to update this bootcamp`,
          401
        )
      );
    }
    bootcamp.remove();

    res.status(200).json({
      sucess: true,
      deletedData: bootcamp,
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
      location: { $geoWithin: { $centerSphere: [[lat, long], area] } },
    });
    res.status(200).json({
      sucess: true,
      count: bootcamp.length,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description upload photo of bootcamp
 * @param route PUT /api/v1/bootcamps/:id/photo
 * @param access PRIVATE
 */
exports.uploadPhotoBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootcampModel.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not found at id ${req.params.id}`, 400)
      );
    }
    //make sure the user is owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorHandler(
          `User ${req.user.id} is not authorised to update this bootcamp`,
          401
        )
      );
    }
    if (!req.files) {
      return next(new ErrorHandler(`please upload a photo`, 400));
    }

    //make sure file is an image
    const file = req.files.file;
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorHandler(`please upload an image file`, 400));
    }

    //make sure image is less than 1mb
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorHandler(
          `please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //CREATE a unique name for each image
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        return next(new ErrorHandler(`problem with file upload`, 500));
      }
      await bootcampModel.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
      res.status(200).json({
        sucess: true,
        data: file.name,
      });
    });
  } catch (error) {
    next(error);
  }
};
