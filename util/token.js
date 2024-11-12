// to generate auth token (Json Web Token) JWT

const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    // jwt.sign(userid,secret,options)
    return jwt.sign({id},process.env.SECRET,{ expiresIn: '1d'})
}

module.exports = generateToken