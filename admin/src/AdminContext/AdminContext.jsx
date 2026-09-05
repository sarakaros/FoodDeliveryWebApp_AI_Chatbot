import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminIds = [
    '688b28bf253ab62dc94cfda4'
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:4000/api/user/info', {
          headers: { token }
        });

        if (res.data.success) {
          setUserInfo(res.data.user);
          setIsAdmin(adminIds.includes(res.data.user._id));
        } else {
          setUserInfo(null);
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Failed to fetch admin user info:', err);
        setUserInfo(null);
        setIsAdmin(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AdminContext.Provider value={{ token, setToken, userInfo, isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
