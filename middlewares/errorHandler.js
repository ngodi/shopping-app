const notFound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} not found`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  req.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { 
  errorHandler,
  notFound
}