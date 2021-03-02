const advanceResults = (model, populate) =>async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  const removeField = ["select", "sort", "limit", "page"];
  removeField.forEach((param) => delete item[param]);

  let queryString = JSON.stringify(reqQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryString));

  if (req.query.select) {
    const select = req.query.select.split(",").join(" ");
    query = query.select(select);
  }

  if (req.query.sort) {
    const sort = req.query.sort.split(",").join(" ");
    query = query.sort(sort);
  } else {
    query = query.sort("-createdAt");
  }

  if (populate) {
    query = query.populate(populate);
  }
  const results = await query;
  res.advanceResults = {
    status: "success",
    count: results.length,
    results: results,
  };
  next();
};

module.exports = advanceResults