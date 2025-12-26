import React, { useEffect,useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard.jsx';
import Loader from '../Loader/Loader.jsx';

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookheaven-04ur.onrender.com/api/v1/get-recent-books"
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
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>RecentlyAdded</h4>
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

export default RecentlyAdded
