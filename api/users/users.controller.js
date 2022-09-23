const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');


exports.authenticateSchema = async function(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

exports.authenticate = async function(req, res, next) {
    userService.authenticate(req.body)
        .then(data => {
            res.json(data.data);
        })
        .catch(next);
}

exports.registerSchema = async function(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

exports.register = async function(req, res, next) {
     userService.create(req.body)
        .then((user) =>{
            console.log('user',user)
            res.json({user: user, message: 'Registration successful' })
        })
        .catch(next);
}

exports.getClientList = async function(req, res, next) {
    userService.clientlist(req.headers.authorization)
    .then(data => {
        res.json({clientlist: data.data.result, message: "Client list fetched successfully"});
    })
    .catch(next);
}