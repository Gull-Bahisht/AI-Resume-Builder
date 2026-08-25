import React, { use } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/home/Navbar'
import {useSelector} from 'react-redux'
import { Loader } from 'lucide-react'
import Login from './Login'
const Layout = () => {


  const {user,loading} = useSelector(state=>state.auth)
  console.log("LAYOUT AUTH:", { user, loading });

  if (loading) {

    return <Loader />
    
  }
  return (
    <div>
      {
        user ? (<div className='min-h-screen bg-gray-50'>
        <Navbar />
        <Outlet/>
      </div>) : <Login />
      }
      
    </div>
  )
}

export default Layout
