import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from './AdminContext/AdminContext'

const App = () => {

  const url ="http://localhost:4000";

  const { token, isAdmin } = useContext(AdminContext);

  // Protect admin routes
  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/" />;              // Not logged in
    if (!isAdmin) return <h2>Access Denied: Not an admin</h2>;  // Logged in but not admin
    return children;
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/add' element={<ProtectedRoute><Add url={url} /></ProtectedRoute>} />
          <Route path='/list' element={<ProtectedRoute><List url={url} /></ProtectedRoute>} />
          <Route path='/orders' element={<ProtectedRoute><Orders url={url} /></ProtectedRoute>} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <ToastContainer />
  //     <Navbar/>
  //     <hr/>
  //     <div className='app-content'>
  //       <Sidebar/>
  //       <Routes>
  //         <Route path='/' element={<Login/>}/>
  //         <Route path='/add' element={<Add url={url}/>}/>
  //         <Route path='/list' element={<List url={url}/>}/>
  //         <Route path='/orders' element={<Orders url={url}/>}/>
  //       </Routes>
  //     </div>
  //   </div>
  // )
}

export default App
