/**
 * @description get all the bootcamps
 * @param route GET /api/v1/bootcamps
 * @param access PUBLIC
 */
exports.getBootcamps = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    body: "show all bootcamps"
  });
};

/**
 * @description get a single bootcamp
 * @param route GET /api/v1/bootcamps/:id
 * @param access PUBLIC
 */
exports.getSingleBootcamp = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    body: `show bootcamp ${req.params.id}`
  });
};

/**
 * @description create a bootcamp
 * @param route POST /api/v1/bootcamps
 * @param access PRIVATE
 */
exports.createBootcamp = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    body: "create new bootcamp"
  });
};

/**
 * @description update a the bootcamps
 * @param route PUT /api/v1/bootcamps/:id
 * @param access PRIVATE
 */
exports.updateBookcamp = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    body: `update bootcamp ${req.params.id}`
  });
};

/**
 * @description delete a the bootcamp
 * @param route DELETE /api/v1/bootcamps/:id
 * @param access PRIVATE
 */
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    body: `delete bootcamp ${req.params.id}`
  });
};
