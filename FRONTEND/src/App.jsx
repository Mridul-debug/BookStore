import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AllBooks from './pages/AllBooks.jsx'
import LogIn from './pages/LogIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Cart from "./pages/Cart.jsx"
import Profile from "./pages/Profile.jsx"
import ViewBookDetails from './components/ViewBookDetails.jsx/ViewBookDetails.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth.js'
import Favoruites from './components/Profile/Favoruites.jsx'
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx'
import Settings from './components/Profile/Settings.jsx'
import AllOrders from './pages/AllOrders.jsx'
import AddBook from './pages/AddBook.jsx'
import UpdateBook from './pages/UpdateBook.jsx'

const App = () => {
  const dispatch=useDispatch()
  const role=useSelector((state)=>state.auth.role)
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path="/all-books" element={<AllBooks/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile"  element={<Profile />} >
          {role==="user" ?(
            <Route index element={<Favoruites/>} />
          ):(
            <Route index element={<AllOrders />} />
          )}
          {role==="admin" && <Route path="/profile/add-book" element={<AddBook />} />}
            <Route path="/profile/orderHistory" element={<UserOrderHistory/>} />
            <Route path="/profile/settings" element={<Settings/>} />
          </Route>
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="view-book-details/:id" element={<ViewBookDetails />}/>
        </Routes>
        <Footer />

    </div>
  )
}

export default App
