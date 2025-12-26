import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa"; // FaUser instead of FaUserLarge
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
   const [AllOrders, setAllOrders] = useState([]);
   const [Options, setOptions] = useState(-1);
   const [Values, setValues] = useState({ status: "" });
   const [userDiv, setuserDiv] = useState("hidden");
   const [userDivData, setUserDivData] = useState(null);

   const headers = {
     id: localStorage.getItem("id"),
     authorization: `Bearer ${localStorage.getItem("token")}`
   };

   // fetch orders once on mount
   useEffect(() => {
     const fetch = async () => {
       try {
         const response = await axios.get("https://bookheaven-04ur.onrender.com/api/v1/get-all-orders", { headers });
         setAllOrders(response.data.data);
       } catch (error) {
         console.error(error);
       }
     };
     fetch();
   }, []);

   const change = (e) => {
     setValues({ status: e.target.value });
   };

   const submitChanges = async (i) => {
     const id = AllOrders[i]?._id;
     if (!id) return;

     try {
       const response = await axios.put(
         `https://bookheaven-04ur.onrender.com/api/v1/update-status/${id}`,
         Values,
         { headers }
       );
       alert(response.data.message);

       // update the specific order status locally
       setAllOrders(prevOrders => {
         const updated = [...prevOrders];
         updated[i] = {
           ...updated[i],
           status: Values.status
         };
         return updated;
       });

       setOptions(-1);
     } catch (error) {
       console.error(error);
     }
   };

   return (
     <>
       {/* loader if orders not fetched yet */}
       {AllOrders.length === 0 && (
         <div className='h-full flex items-center justify-center'>
           <Loader />
         </div>
       )}

       {/* only show valid book orders */}
       {AllOrders.filter(order => order.book).length > 0 && (
         <div className='h-full p-0 md:p-4 text-zinc-100'>
           <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
             All Orders
           </h1>

           {/* header row */}
           <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
             <div className='w-[3%]'><h1 className='text-center'>Sr.</h1></div>
             <div className='w-[40%] md:w-[25%]'><h1>Books</h1></div>
             <div className='w-0 md:w-[45%] hidden md:block'><h1>Description</h1></div>
             <div className='w-[17%] md:w-[9%]'><h1>Price</h1></div>
             <div className='w-[30%] md:w-[16%]'><h1>Status</h1></div>
             <div className='w-[10%] md:w-[5%]'><h1><FaUser /></h1></div>
           </div>

           {/* order rows */}
           {AllOrders.filter(order => order.book).map((items, i) => (
             <div
               key={items._id}
               className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'
             >
               {/* Sr */}
               <div className='w-[3%]'>
                 <h1 className='text-center'>{i + 1}</h1>
               </div>

               {/* Book title */}
               <div className='w-[40%] md:w-[22%]'>
                 <Link
                   to={`/view-book-details/${items.book._id}`}
                   className='hover:text-blue-300'
                 >
                   {items.book.title}
                 </Link>
               </div>

               {/* Description */}
               <div className='w-0 md:w-[45%] hidden md:block'>
                 <h1>{items.book.desc?.slice(0, 50)}...</h1>
               </div>

               {/* Price */}
               <div className='w-[17%] md:w-[9%]'>
                 <h1>₹ {items.book.price}</h1>
               </div>

               {/* Status */}
               <div className='w-[30%] md:w-[16%]'>
                 <h1 className="font-semibold">
                   <button
                     className='hover:scale-105 transition-all duration-300'
                     onClick={() => setOptions(i)}
                   >
                     {items.status === "Order Placed" ? (
                       <span className="text-green-500">{items.status}</span>
                     ) : items.status === "Cancelled" ? (
                       <span className="text-red-500">{items.status}</span>
                     ) : (
                       <span className="text-yellow-500">{items.status}</span>
                     )}
                   </button>

                   <div className={`${Options === i ? "flex" : "hidden"}`}>
                     <select
                       name="status"
                       className='bg-gray-800'
                       onChange={change}
                       value={Values.status}
                     >
                       {[
                         "Order Placed",
                         "Out for Delivery",
                         "Delivered",
                         "Cancelled",
                       ].map((opt, index) => (
                         <option value={opt} key={index}>
                           {opt}
                         </option>
                       ))}
                     </select>

                     <button
                       className='text-green-500 hover:text-pink-600 mx-2'
                       onClick={() => { setOptions(-1); submitChanges(i); }}
                     >
                       <FaCheck />
                     </button>
                   </div>
                 </h1>
               </div>

               {/* user info */}
               <div className='w-[10%] md:w-[5%]'>
                 <button
                   className='text-xl hover:text-orange-500'
                   onClick={() => {
                     setuserDiv("fixed");
                     setUserDivData(items.user);
                   }}
                 >
                   <IoOpenOutline />
                 </button>
               </div>
             </div>
           ))}
         </div>
       )}

       {/* user detail modal */}
       {userDivData && (
         <SeeUserData
           userDivData={userDivData}
           userDiv={userDiv}
           setuserDiv={setuserDiv}
         />
       )}
     </>
   );
};

export default AllOrders;
