import React, { useEffect,useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookheaven-04ur.onrender.com/api/v1/get-all-books"
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchBooks(); // 👈 MUST call it
  }, []);
  return (
    <div className='bg-zinc-900  h-auto px-12 py-8'>
       <h4 className='text-3xl text-yellow-100'>All Books</h4>
      {!Data && (
        <div className='flex items-center justify-center my-8'>
          <Loader />{" "}
        </div>
        
      )}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        
        {Data && Data.map((items,i)=><div key={i} ><BookCard data={items} /></div>)}
      </div>
    </div>
  )
}

export default AllBooks
