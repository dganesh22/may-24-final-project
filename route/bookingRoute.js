const bookingRoute = require('express').Router()
const { bookRoom, getBookingByUserId, getAllBookings, updateBooking, deleteBooking, getBookingById } = require('../controller/bookingController')
const authMiddleware = require('../middleware/authMiddleware')
const authRole = require('../middleware/authRole')

// post path to book a room
bookingRoute.post(`/room`, bookRoom)

// read booking data by user id
bookingRoute.get(`/room/user/:id`, getBookingByUserId)

bookingRoute.get(`/room/booking/:id`, getBookingById)

// to read all bookings
bookingRoute.get(`/room/all`, authMiddleware, authRole, getAllBookings)

// update booking
bookingRoute.patch(`/room/update/:id`, updateBooking)

// delete booking
bookingRoute.delete(`/room/delete/:id`, deleteBooking)

module.exports = bookingRoute