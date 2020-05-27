const advanceFiltering = (model, populate) => async (req, res, next) => {
  let reqQuery = { ...req.query };

  //remove field from reqQuery
  const removeFields = ["select", "sort", "limit", "page"];
  removeFields.forEach((param) => delete reqQuery[param]);

  //JSON to Javascript object conversion
  let queryStr = JSON.stringify(reqQuery);

  //FOR less than , less than equal , greater than equal ...etc
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  //get data from database
  let query = model.find(JSON.parse(queryStr));

  //if select is given in the url then extract those value which are mentioned
  if (req.query.select) {
    let a = req.query.select.split(",").join(" ");
    query = query.select(a);
  }

  //sorting , by deflaut give everything in sorted order by createAt field ,
  // '-' means decending order
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //populate if populate is passsed
  if (populate) {
    query = query.populate(populate);
  }

  //Add pagination
  let pagination = {};
  //change default limit to (number under 4) to see the prev and next in pagination object
  const limit = parseInt(req.query.limit, 10) || 100;
  const page = parseInt(req.query.page, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  //await for everything (bootcampModel , .select)
  const results = await query;

  res.advanceResults = {
    sucess: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advanceFiltering;
