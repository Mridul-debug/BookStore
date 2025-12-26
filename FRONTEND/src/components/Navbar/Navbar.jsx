import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Modify links based on auth
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }

  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://static.vecteezy.com/system/resources/previews/000/586/123/original/book-reading-logo-and-symbols-template-icons-vector.jpg"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="hover:text-blue-400 transition"
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <>
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition"
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileNav && (
        <div className="bg-zinc-800 h-screen fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-white text-4xl mb-8 font-semibold hover:text-blue-400"
              onClick={() => setMobileNav(false)}
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <>
              <Link
                to="/LogIn"
                className="px-8 mb-6 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800"
                onClick={() => setMobileNav(false)}
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800"
                onClick={() => setMobileNav(false)}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
