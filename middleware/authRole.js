const { StatusCodes } = require('http-status-codes')
const Auth = require('../model/authModel')

const authRole = async (req,res,next) => {
    try {
        let id = req.userId

        let eUser = await Auth.findById(id)
            if(!eUser)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "requested user id not found" })

        if(eUser.role !== "admin") {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: "Access denied..! for non-admin users" })
        }

        next()
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = authRole