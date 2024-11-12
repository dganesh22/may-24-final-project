const Booking = require('../model/bookingModel')
const Auth  = require('../model/authModel')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')


// book a room
const bookRoom = async (req,res) => {
    try {

        let { name, email, mobile, password } = req.body

        // encrypt the password hash(salt)
        let encPass = await bcrypt.hash(password,10)

        // check user email and mobile is already registered or not
        let exEmail = await Auth.findOne({email})
            if(exEmail) return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${email} already registered`})

        let exMobile = await Auth.findOne({ mobile })
            if(exMobile) return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${mobile} number already registered`})

        // save the user info
        let newUser = await Auth.create({ name, email, mobile, password: encPass})

        // if new user created
            if(newUser) {
                
                let eUser = await Booking.findOne({ userId: newUser._id })
                if(eUser)
                    return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Room is already booked.. Login and Check the details..`})

            let newBooking = await Booking.create({
                 userId: newUser._id,
                 roomType: req.body.roomType,
                 guests: req.body.guests,
                 checkIn: req.body.checkIn,
                 checkOut: req.body.checkOut,
                 pickup: req.body.pickup === "yes" ? true : false,
                 adults: req.body.adults,
                 children: req.body.children
            })

            return res.status(StatusCodes.CREATED).json({ status: true, msg: "Room Booking successful"})
            }

    }catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// to read booking data based on user id
const getBookingByUserId = async (req,res) => {
    try {
        let id = req.params.id 

        let eUser = await Auth.findById(id).select('-password')
            if(!id)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "no bookings found"})

        let eBook = await Booking.findOne({ userId: id })
            if(!eBook)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "no bookings found"})

        return res.status(StatusCodes.OK).json({ status: true, booking: eBook, user: eUser})
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

const getAllBookings = async (req,res) => {
    try {
        let bookings = await Booking.find({})

        return res.status(StatusCodes.ACCEPTED).json({ status: true, length: bookings.length, bookings })
    }catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err})
    }
}

// get booking data by id
const getBookingById = async (req,res) => {
    try {
        let id = req.params.id 

        let eBook = await Booking.findById(id)
            if(!eBook)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "no bookings found"})

        return res.status(StatusCodes.OK).json({ status: true, booking: eBook })
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// update booking
const updateBooking = async (req,res) => {
    try {
            let eBooking = await Booking.findById({ _id: req.params.id })
                if(!eBooking) {
                    return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested booking id not found`})
                }   
             await Booking.findByIdAndUpdate({_id: req.params.id },req.body)

            return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "Booking Updated successfully"})
            

    }catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// delete booking
const deleteBooking = async (req,res) => {
    try {
        let eBooking = await Booking.findById({ _id: req.params.id })
            if(!eBooking) {
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested booking id not found`})
            }   
         await Booking.findByIdAndDelete({_id: req.params.id })

        return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "Booking deleted successfully"})
        

}catch(err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
}
}


module.exports = { bookRoom, getBookingByUserId, getAllBookings, getBookingById, updateBooking, deleteBooking }