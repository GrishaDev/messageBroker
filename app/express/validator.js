const Joi = require('joi');
const config = require('../config');
const { HttpError } = require ('../utils/Error');

const validMessage = Joi.object({
    message: Joi.string().required(),
    topic: Joi.string().required(),
});

const validSubscribe = Joi.object({
    clientId: Joi.string().required(),
    topic: Joi.string().required(),
});

const isValidMessage = (req, res, next) => {
    const { error } = validMessage.validate(req.body);
    if(error) {
        sendError(error);
    }
    return next(); 
}

const isValidSubscribe = (req, res, next) => {
    const { error } = validSubscribe.validate(req.body);
    if(error) {
        sendError(error);
    }
    return next(); 
}

const sendError = (err) => {
    let msg = err.details[0].message;
    msg = msg.replace(/"/g, '');
    throw new HttpError(400, msg);
}

module.exports = { isValidMessage, isValidSubscribe }