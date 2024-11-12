import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Home(props) {
  const { user, booking } = useContext(AuthContext)

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-success">Bookings</h3>
          </div>
        </div>

        <div className="row">
            <div className="col-md-6 mt-2">
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong className="text-secondary">Name</strong>
                        <span className="text-success float-end"> { user.name } </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Email</strong>
                        <span className="text-success float-end"> { user.email } </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Mobile</strong>
                        <span className="text-success float-end"> { user.mobile } </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Role</strong>
                        <span className="text-success float-end"> { user.role } </span>
                    </li>
                </ul>
            </div>
            <div className="col-md-6 mt-2">
            <ul className="list-group">
                    <li className="list-group-item">
                        <strong className="text-secondary">Room Type</strong>
                        <span className="text-success float-end"> { booking.roomType } </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Guests</strong>
                        <span className="text-success float-end"> { booking.guests } (adults - {booking.adults} & children - {booking.children}) </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">CheckIn</strong>
                        <span className="text-success float-end"> Check In - {new Date(booking.checkIn).toLocaleString()} </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Check Out</strong>
                        <span className="text-success float-end"> Check Out - {new Date(booking.checkOut).toLocaleString()} </span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3 mt-3">
          <ul className="list-group">
                    <li className="list-group-item">
                        <strong className="text-secondary">Booking Status</strong>
                        <span className="text-success float-end"> { booking.bookingStatus } </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Payment Type</strong>
                        <span className="text-success float-end"> { booking.paymentType }  </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Payment Id</strong>
                        <span className="text-success float-end"> { booking.paymentId} </span>
                    </li>
                    <li className="list-group-item">
                        <strong className="text-secondary">Payment Status</strong>
                        <span className="text-success float-end"> { booking.paymentStatus ? "Paid": "Not Paid"} </span>
                    </li>
                </ul>
          </div>
        </div>
    </div>
  )
}

export default Home