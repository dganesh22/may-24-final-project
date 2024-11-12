import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminDashboard() {
  const context = useContext(AuthContext)

  const deleteHandler = async (id) => {
    if(window.confirm(`Are you sure to delete booking?`)) {
        await axios.delete(`/api/booking/room/delete/${id}`)
          .then(res => {
              toast.success(res.data.msg)
          }).catch(err => toast.error(err.response.data.msg))
    }
  }

  return (
    <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-success">
                  All Bookings Info
              </h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
              <div className="table table-responsive">
                  <table className="table table-bordered table-striped table-hover text-center">
                      <thead>
                        <tr>
                            <th>CheckIn</th>
                            <th>CheckOut</th>
                            <th>Guests</th>
                            <th>Pickup</th>
                            <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                              context?.allBookings.map((item,index) => {
                                return (
                                  <tr key={index}>
                                      <td> { new Date(item.checkIn).toLocaleString()} </td>
                                      <td> { new Date(item.checkOut).toLocaleString()} </td>
                                      <td> { item.guests } </td>
                                      <td> { item.pickup ? "Need Pickup": "Don't Need" } </td>
                                      <td>
                                          <NavLink className="btn btn-info" to={`/user/details/${item.userId}`}>
                                            <i className="bi bi-person"></i>
                                          </NavLink>

                                          <NavLink to={`/booking/edit/${item._id}`} className="btn btn-primary">
                                              <i className="bi bi-pencil"></i>
                                          </NavLink>

                                          <button onClick={() => deleteHandler(item._id)} className="btn btn-danger">
                                              <i className="bi bi-trash"></i>
                                          </button>
                                      </td>
                                  </tr>
                                )
                              })
                          }
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard