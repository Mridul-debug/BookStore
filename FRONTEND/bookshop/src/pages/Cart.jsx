import React,{useEffect, useState} from 'react'
import Loader from "../components/Loader/Loader"
import axios from 'axios'
import {AiFillDelete} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const navigate=useNavigate();
  const [Cart,setCart]=useState([])
  const [Total,setTotal]=useState(0)
   const headers={
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get(
        "https://bookheaven-04ur.onrender.com/api/v1/get-user-cart",
        {headers}
      )
      setCart(res.data.data)
    }
    fetch();
  },[Cart])



  const deleteItem=async(bookid)=>{
    const response=await axios.put(`https://bookheaven-04ur.onrender.com/api/v1/remove-from-cart/${bookid}`,{},
      {headers}
    )
    alert(response.data.message)
  }
  useEffect(()=>{
    if(Cart && Cart.length>0){
      let total=0
      Cart.map((items)=>{
        total+=Number(items.price);
      })
      setTotal(total)
      total=0
    }
  },[Cart])

  const PlaceOrder=async()=>{
    try {
      const response=await axios.post(
        `https://bookheaven-04ur.onrender.com/api/v1/place-order`,
        {order:Cart},
        {headers}
      )
      alert(response.data.message)
      navigate("/profile/orderHistory")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
    {!Cart && <div className='w-full h-full flex items-center justify-center'><Loader /> </div>}
    {Cart && Cart.length===0 &&(
      <div className='h-screen'>
        <div className='h-full flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
            Empty Cart
          </h1>
          <img 
           src="https://imgs.search.brave.com/WAEJ6R8tQy8lymbWyiSSV2thVRcL7UX-u9W-zx0KwHs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvZW1wdHkt/Y2FydC1pbGx1c3Ry/YXRpb24tc3ZnLWRv/d25sb2FkLXBuZy0x/MTA2ODYwNy5wbmc" 
           alt="empty cart"
           className='lg:h-[50vh]'         
          />

        </div>

      </div>
    )}
    {Cart && Cart.length>0 &&(
      <>
      <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
        Your Cart
      </h1>
      {Cart.map((items) => (
  <div
    key={items._id}
    className="w-full my-4 rounded flex items-center p-6 bg-zinc-800 justify-between"
  >
    {/* Left: Image */}
    <div className="flex items-center gap-6">
      <img
        src={items.url}
        alt="/"
        className="h-[120px] w-[90px] object-cover rounded"
      />

      {/* Book Info */}
      <div>
        <h1 className="text-2xl text-zinc-100 font-semibold">
          {items.title}
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          {items.author || "1111"}
        </p>
      </div>
    </div>

    {/* Right: Price + Delete */}
    <div className="flex items-center gap-8">
      <h2 className="text-zinc-100 text-3xl font-semibold">
        ₹ {items.price}
      </h2>

      <button
        className="bg-red-100 text-red-700 border border-red-700 rounded p-3"
        onClick={() => deleteItem(items._id)}
      >
        <AiFillDelete size={22} />
      </button>
    </div>
  </div>
))}

      </>
    )}
    {Cart && Cart.length>0 && (
      <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-3xl text-zinc-200 font-semibold'>
            Total Amount
          </h1>
          <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
            <h2>{Cart.length} books</h2> <h2>₹ {Total}</h2>
          </div>
          <div className='w-full mt-3'>
            <button 
             className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
             onClick={PlaceOrder}
            >
              Place your order

            </button>
          </div>
        </div>
      </div>

    )}
    </div>
  )
}

export default Cart
