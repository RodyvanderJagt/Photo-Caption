const User = require('../models').User;
const bcrypt = require('bcryptjs');

const {
    SALT_ROUNDS = 10
} = process.env;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}


const createUser = async (req, res) => {
    const salted_password = await hashPassword(req.body.password);
    console.log(salted_password);
    return User.create({
        name: req.body.username,
        password: salted_password
    })
    .then(user => res.status(201).send(user.name))
    .catch(error => res.status(400).send(error));
}

module.exports = { 
    createUser
}