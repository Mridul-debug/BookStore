import React,{useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axios from "axios"
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Values,setValues]=useState({
    username:"",
    password:"",
  })
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value})
  }
  const submit=async()=>{
    try {
      if(Values.username==="" || Values.password==="")
      {
        alert("All fields are required")
      }
      else{
        const response=await axios.post(
          "https://bookheaven-04ur.onrender.com/api/v1/sign-in",
          Values
        )

        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))

        localStorage.setItem("id",response.data.id)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)
        navigate("/profile")
      }
      
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold">Login</p>

        <div className="mt-4">
          {/* Username */}
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>

         

          {/* Password */}
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>

         

          {/* Button */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            onClick={submit}>
              LogIn
            </button>
          </div>

          {/* SignUp Link */}
          <p className="flex mt-4 justify-center text-zinc-500 font-semibold">
            Don't have an account?&nbsp;
            <Link to="/SignUp" className="hover:text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn
