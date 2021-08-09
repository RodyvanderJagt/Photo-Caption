const User = require('../models').User;
const bcrypt = require('bcryptjs');

const {
    SALT_ROUNDS = 10,
    SESS_NAME = 'sid'
} = process.env;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

const createUser = async (req, res) => {
    const salted_password = await hashPassword(req.body.password);
    return User.create({
        name: req.body.username,
        password: salted_password
    })
    .then(user => res.status(201).send(user.name))
    .catch(error => res.status(400).send(error));
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    return User.findAll({
        where: {
            name: username
        }
    })
    .then(users => {
        const user = users[0];
        if (user) {
            const hash = user.password;
            bcrypt.compare(password, hash, (err, isValid) => {
                if (err) {
                    throw err;
                } else if (isValid) {
                    req.session.userId = user.id;
                    res.redirect('/home');
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch((error) => res.status(400).send(error));
}

const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.redirect('/home');
        }
    })
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
}

module.exports = { 
    createUser,
    loginUser,
    logoutUser
}