import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBooking() {
  const [room,setRoom] = useState({
      roomType: "",
      bookingStatus: ""
  })
  
  // to navigate to other router
    let navigate = useNavigate()
    let params = useParams()

    const readData = async () => {
      await axios.get(`/api/booking/room/booking/${params.id}`)
          .then(res => {
            setRoom(res.data.booking)
          }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
      readData()
    },[])

    const readInput = (e) => {
        const { name, value } = e.target
        setRoom({...room, [name]:value})
    }

    const submitHandler  = async (e) => {
        e.preventDefault()
        try {
            let data = {
              bookingStatus: room.bookingStatus,
              paymentStatus: room.bookingStatus === "confirmed" ? true : false
            }

            await axios.patch(`/api/booking/room/update/${params.id}`,data)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/`)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Update Booking Form</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-10 offset-md-1">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                           
                            <div className="row mt-2">
                                <div className="col-md-4">
                                    <label htmlFor="roomType">Room Type  <span className="text-danger">*</span></label>
                                    <select name="roomType" id="roomType" value={room.roomType} onChange={readInput} className="form-select">
                                        <option value="null">Choose Room Type</option>
                                        <option value="ac">Ac</option>
                                        <option value="non-ac">Non-Ac</option>
                                        <option value="delux">Delux</option>
                                        <option value="cottage">Cottage</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="bookingStatus">Booking Status</label>
                                    <select name="bookingStatus" id="bookingStatus" value={room.bookingStatus} onChange={readInput} className="form-select">
                                        <option value="null">Choose Booking Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="reserved">Reserved</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <input type="submit" value="Update" className="btn btn-success" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateBooking