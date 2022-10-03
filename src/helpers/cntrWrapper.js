/** @format */

const cntrWrapper = (cntr) => async (req, res, next) => {
  try {
    await cntr(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = cntrWrapper;
