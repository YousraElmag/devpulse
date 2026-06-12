import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Signup from './component/Signup'
import { Login } from './component/Login'
function App() {
  return (
    <>
    <Signup/>
    <Login/>
    </>
  )
}

export default App
