import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import {useSelector} from "react-redux"

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  let links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  if (isLoggedIn) {
    // only show Cart and Profile for logged in users
    links.push({ title: "Cart", link: "/cart" });
    links.push({ title: "Profile", link: "/profile" });

    // if admin, show admin profile too
    if (role === "admin") {
      links.push({ title: "Admin Profile", link: "/admin" });
    }
  }

  const [MobileNav,setMobileNav]=useState("hidden")


  return (
    <>
    <nav className=' z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
      
      {/* Logo Section */}
      <Link to="/" className='flex items-center'>
        <img
          className='h-10 me-4'
          src='https://static.vecteezy.com/system/resources/previews/000/586/123/original/book-reading-logo-and-symbols-template-icons-vector.jpg'
          alt='logo'
        />
        <h1 className='text-2xl font-semibold'>BookHeaven</h1>
      </Link>

      {/* Navigation + Buttons */}
      <div className='nav-links-bookheaven block md:flex items-center gap-4 '>

        {/* Navigation Links */}
        <div className='hidden md:flex gap-4'>
          {links.map((item, i) => {
            return (
              <Link to={item.link}
                key={i}
                className='cursor-pointer hover:text-blue-400 transition-all duration-300'
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Buttons */}
        {isLoggedIn===false && <div className='hidden md:flex gap-4'>
          <Link
           to="/LogIn" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
            Login
          </Link>

          <Link
            to="/SignUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
            SignUp
          </Link>
        </div> }

        <button className=' block md:hidden text-white text-2xl hover:text-zinc-400' onClick={()=>MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden")}>
          <FaGripLines />
        </button>

      </div>
    </nav>
    <div className={ `${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col item-center justify-center `}>
      {links.map((item, i) => {
            return (
              <Link to={item.link}
                key={i}
                className={`${MobileNav} text-white text-4xl mb-8 font-semibold cursor-pointer hover:text-blue-400 transition-all duration-300`}
                onClick={()=>{
                  MobileNav==="hidden"
                  ? setMobileNav("block")
                  :setMobileNav("hidden")
                }}
              >
                {item.title}
              </Link>
            );
          })}

           
          {isLoggedIn===false && <><Link
           to="/LogIn" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
           onClick={()=>{
                  MobileNav==="hidden"
                  ? setMobileNav("block")
                  :setMobileNav("hidden")
                }}>
            Login
          </Link>

          <Link
            to="/SignUp" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            onClick={()=>{
                  MobileNav==="hidden"
                  ? setMobileNav("block")
                  :setMobileNav("hidden")
                }}>
            SignUp
          </Link></> }
    </div>
    </>
  );
}

export default Navbar;
