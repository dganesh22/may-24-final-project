import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './Components/Menu'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Pnf from './Pages/Pnf'
import { ToastContainer } from 'react-toastify'
import AuthRoute from './PrivateRoute/AuthRoute'
import BookingForm from './Pages/BookingForm'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { AuthContext } from './Context/AuthContext'
import BookingDetails from './Pages/Admin/BookingDetails'
import UpdateBooking from './Pages/Admin/UpdateBooking'
// import AdminLogin from './Pages/Admin/AdminLogin'

function App() {
  let context = useContext(AuthContext)
  return (
    <BrowserRouter>
        <Menu/>
        <ToastContainer autoClose={3000} />
        <Routes>
             <Route element={<AuthRoute/>} >
                <Route path={`/`} element={context.role === "admin" ? <AdminDashboard/>: <Home/>} />
                <Route path={`/user/details/:id`} element={ <BookingDetails/> } />
                <Route path={`/booking/edit/:id`} element={<UpdateBooking/> } />
             </Route>
            <Route path={`/login`} element={<Login/>} />
            {/* <Route path={`/login/admin`} element={<AdminLogin/>} /> */}
            <Route path={`/register`} element={<Register/>} />
            <Route path={`/booking/form`} element={<BookingForm/>} />
            <Route path={`/*`} element={<Pnf/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App