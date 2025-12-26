import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bookheaven-04ur.onrender.com/api/v1/remove-book-from-favorite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  // Optional placeholder if no image
  const imgSrc = data.url || "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-900 rounded overflow-hidden flex items-center justify-center h-[30vh]'>
          <img
            src={imgSrc}
            alt={data.title}
            className='object-contain h-full w-full'
          />
        </div>

        <h2 className='mt-4 text-xl text-white font-semibold truncate'>
          {data.title}
        </h2>

        <p className='mt-2 text-zinc-400 font-medium truncate'>
          by {data.author}
        </p>

        <p className='mt-2 text-zinc-200 font-semibold text-lg'>
          ₹ {data.price}
        </p>
      </Link>

      {favourite && (
        <button
          className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 text-sm'
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
