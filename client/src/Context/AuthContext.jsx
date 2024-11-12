import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const AuthContext = createContext()


function AuthProvider(props) {
    const [isLogin,setIsLogin] = useState(false)
    const [token,setToken] = useState(false)
    const [user,setUser] = useState(false)
    const [booking,setBooking] = useState(false)
    const [role,setRole] = useState("user")
    // all bookings
    const [allBookings,setAllBookings] = useState([])
  
    // read user info
        let readUser = async () => {
            await axios.get(`/api/auth/verify/userToken`,{
                headers: {
                    Authorization: token
                }
            }).then(res => {
                setUser(res.data.user)
                setRole(res.data.user.role)
                if(res.data.user.role === "user") {
                    getBookingData(res.data.user._id)
                }
                toast.success("User verified successfully")
            }).catch(err => toast.error(err.response.data.msg))
        }
        
// read booking info
        let getBookingData = async (id) => {
            await axios.get(`/api/booking/room/user/${id}`)
                .then(res => {
                    setBooking(res.data.booking)
                }).catch(err => toast.error(err.response.data.msg))
        }

// read all bookings 
let getAllBookings = async () => {
    await axios.get(`/api/booking/room/all`, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        setAllBookings(res.data.bookings)
    }).catch(err => toast.error(err.response.data.msg))
}
    
        useEffect(() => {
            if(token) {
                readUser()
                if(role === "admin") {
                    getAllBookings()
                }
            }
        },[token,role])



    let logoutHandler = async () => {
        if(window.confirm(`Are you sure to logout?`)) {
            await axios.get(`/api/auth/logout`)
                    .then(res => {
                        toast.success(res.data.msg)
                        setIsLogin(false)
                        setToken(false)
                        window.location.reload()
                    })
                    .catch(err => toast.error(err.response.data.msg))
        }
    }

    return (
        <AuthContext.Provider value={{ isLogin, user, setIsLogin, setUser, token,setToken, logoutHandler, booking, role,setRole, allBookings, setAllBookings }} >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthProvider