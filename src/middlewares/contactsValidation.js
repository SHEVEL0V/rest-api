/** @format */

const Joi = require("joi");

module.exports = {
  postContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      phone: Joi.string().min(7).max(14).required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message,
        code: 400,
      });
    }

    next();
  },

  putContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .optional(),
      phone: Joi.string().min(7).max(14).optional(),
      favorite: Joi.boolean().optional(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message,
        code: 400,
      });
    }

    next();
  },
  putContactsStatusValidation: (req, res, next) => {
    const schema = Joi.object({ favorite: Joi.boolean().required() });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: "missing field favorite",
        code: 400,
        status: validationResult.error.details,
      });
    }

    next();
  },
};
