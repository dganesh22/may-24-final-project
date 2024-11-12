import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function BookingForm() {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        roomType: "",
        guests: 1,
        checkIn: "",
        checkOut: "",
        adults: 1,
        children: 0,
    })
    const [pickup,setPickup] = useState("")

  // to navigate to other router
    let navigate = useNavigate()

    const readInput = (e) => {
        const { name, value } = e.target
        setUser({...user, [name]: value })
    }

    const submitHandler  = async (e) => {
        e.preventDefault()
        try {

            let data = {
                ...user,
                pickup
            }
           
            await axios.post(`/api/booking/room`,data)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/login`)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Booking Form</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-10 offset-md-1">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="name">Name <span className="text-danger">*</span> </label>
                                    <input type="text" name="name" id="name" className="form-control" value={user.name} onChange={readInput} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                    <input type="email" name="email" id="email" className="form-control" value={user.email} onChange={readInput} required />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <label htmlFor="roomType">Room Type  <span className="text-danger">*</span></label>
                                    <select name="roomType" id="roomType" value={user.roomType} onChange={readInput} className="form-select">
                                        <option value="null">Choose Room Type</option>
                                        <option value="ac">Ac</option>
                                        <option value="non-ac">Non-Ac</option>
                                        <option value="delux">Delux</option>
                                        <option value="cottage">Cottage</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="guests">Guests <span className="text-danger">*</span></label>
                                    <input type="number" name="guests" id="guests" value={user.guests} onChange={readInput} className="form-control" required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="adults">Adults  <span className="text-danger">*</span></label>
                                    <input type="number" name="adults" id="adults" value={user.adults} onChange={readInput} className="form-control" required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="children">Children  <span className="text-danger">*</span></label>
                                    <input type="number" name="children" id="children" value={user.children} onChange={readInput} className="form-control" required />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="checkIn">Check In  <span className="text-danger">*</span></label>
                                    <input type="datetime-local" name="checkIn" id="checkIn" value={user.checkIn} onChange={readInput} className="form-control" required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="checkOut">Check Out <span className="text-danger">*</span></label>
                                    <input type="datetime-local" name="checkOut" id="checkOut" value={user.checkOut} onChange={readInput} className="form-control" required />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
                                    <input type="number" name="mobile" id="mobile" className="form-control" value={user.mobile} onChange={readInput} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="password">Password <span className="text-danger">*</span></label>
                                    <input type="password" name="password" id="password" className="form-control" value={user.password} onChange={readInput} required />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label htmlFor="pickUp">Pickup Needed? <span className="text-danger">*</span></label>
                                </div>
                                <div className="col-md-6">
                                  
                                   <input type="radio" name="pickup" id="pickup" value={"yes"} onChange={(e) => setPickup(e.target.value)}  className="form-check-input" required /> 
                                   <label className="form-check-label">Yes Please, - Pick me up on arrival </label>
                                </div>
                                <div className="col-md-6">
                                    
                                   <input type="radio" name="pickup" id="pickup" value={"no"} onChange={(e) => setPickup(e.target.value)}  className="form-check-input" required /> 
                                   <label className="form-check-label"> No Thanks - I'll make my own way there </label>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <input type="submit" value="Submit Form" className="btn btn-success" />
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

export default BookingForm