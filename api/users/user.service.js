const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const { secret } = require('config.json');
const db = require('_helpers/db');
const { func } = require('joi');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    clientlist,
};

async function authenticate({ username, password }) {
    // const user = await db.User.scope('withHash').findOne({ where: { username } });

    // if (!user || !(await bcrypt.compare(password, user.hash)))
    //     throw 'Username or password is incorrect';

    // // authentication successful
    // const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    // return { ...omitHash(user.get()), token };

    // axios.post('http://betadevapi.conceptbiu.com/app/auth/login', {'email':username, 'password':password})
    //   .then(function (response) {
    //     return response.data
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const data = {'email':username, 'password':password}
    const url = "http://betadevapi.conceptbiu.com/app/auth/login";
    const config = {
        method: 'post',
        url,
        headers: { 'Content-Type': 'application/json' },
        data,
      };
      return axios(config);
}

async function clientlist(authorization) {
    const url = "http://betadevapi.conceptbiu.com/app/client/clientslist";
    const config = {
        method: 'post',
        url,
        headers: { 'Content-Type': 'application/json', "Authorization" : authorization },
      };
      return axios(config);
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    return await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}