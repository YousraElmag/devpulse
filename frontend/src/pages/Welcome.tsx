import React,{useEffect} from 'react';
import {useNavigate,Link}from 'react-router-dom';
import axios from 'axios';

export const Welcome:React.FC=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        const verifyUserToken=async()=>{
            const token=localStorage.getItem("token")
            if (!token)return;

            try{
                const response=await axios.get('/api/verify',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.data.valid){
                    console.log('token still valid')
                    navigate("/dashboard");
                }
            }catch(error){
                console.error('this token is expired',error)
                localStorage.removeItem('token')
            }
        }
    verifyUserToken()
    },[navigate]);
    return(
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to DevPluse 🐙</h1>
          <p className='text-gray-400 mb-8'>All your developer insights in one place.</p>
          <div className="space-x-4">
            <Link to="/login" className="bg-indigo-650 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition">
             Go to Login
             </Link>
                <Link to="/Signup" className="bg-indigo-650 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition">
             Signup
             </Link>
          </div>


        </div>
        
    )
}