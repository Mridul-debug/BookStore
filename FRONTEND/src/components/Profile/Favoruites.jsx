import React, { useEffect,useState} from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'

function Favoruites() {
     const headers={
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  const [FavouriteBooks,setFavouriteBooks]=useState([])

    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get(
                "https://bookheaven-04ur.onrender.com/api/v1/get-favourites-books",
            {headers}
        )

        setFavouriteBooks(response.data.data)
        }
        fetch();
    },[FavouriteBooks])
  return (
  <>
    {FavouriteBooks.length === 0 && (
      <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full h-[50vh]">
        No Favourite Books
      </div>
    )}

    {FavouriteBooks.length > 0 && (
      <div className="grid grid-cols-3 gap-4">
        {FavouriteBooks.map((items) => (
          <BookCard
            key={items._id}
            data={items}
            favourite={true}
          />
        ))}
      </div>
    )}
  </>
);

}

export default Favoruites
