import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './App.css'
import Signup from './component/Signup'
import { Login } from './component/Login'
import { Welcome } from './pages/Welcome'

function App() {
  return (

    
      <Routes>

        <Route path="/" element={<Welcome />} />
        

        <Route path="/login" element={<Login />} />
        
     
        <Route path="/signup" element={<Signup />} />
      </Routes>
 
  )
}

export default App