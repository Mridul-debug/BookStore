import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookheaven-04ur.onrender.com/api/v1/get-order-history",
          { headers }
        );

        setOrderHistory(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <div className="h-[80vh] p-4 text-zinc-100">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No Order History
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="/"
            className="h-[20vh] mb-8"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Your Order History
      </h1>

      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
        <div className="w-[3%]">
          <h1 className="text-center">Sr.</h1>
        </div>
        <div className="w-[22%]">
          <h1>Books</h1>
        </div>
        <div className="w-[45%]">
          <h1>Description</h1>
        </div>
        <div className="w-[9%]">
          <h1>Price</h1>
        </div>
        <div className="w-[16%]">
          <h1>Status</h1>
        </div>
        <div className="hidden md:block md:w-[5%]">
          <h1>Mode</h1>
        </div>
      </div>

      {orderHistory.map((item, i) => (
        <div
          key={item._id || i}
          className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
        >
          <div className="w-[3%]">
            <h1 className="text-center">{i + 1}</h1>
          </div>

          <div className="w-[22%]">
            <Link
              to={`/view-book-details/${item.book._id}`}
              className="hover:text-blue-300"
            >
              {item.book.title}
            </Link>
          </div>

          <div className="w-[45%]">
            <h1>{item.book.desc?.slice(0, 50)}...</h1>
          </div>

          <div className="w-[9%]">
            <h1>₹ {item.book.price}</h1>
          </div>

          <div className="w-[16%]">
            <h1 className="font-semibold">
              {item.status === "Order Placed" ? (
                <span className="text-green-500">{item.status}</span>
              ) : item.status === "Cancelled" ? (
                <span className="text-red-500">{item.status}</span>
              ) : (
                <span className="text-yellow-500">{item.status}</span>
              )}
            </h1>
          </div>

          <div className="hidden md:block md:w-[5%]">
            <h1 className="text-sm text-zinc-400">COD</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderHistory;
