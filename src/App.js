import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { AuthContext } from './context/auth-context';
//import queryString from "query-string"
import './styles/styles.css';

function App() {
  const [userId, setUserId] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //const [error, setError] = useState(null)
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token, admin, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setIsAdmin(admin);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    localStorage.setItem(
      'userData',
      JSON.stringify({ 
        token: token, 
        userId: uid, 
        admin: admin,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);
  
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect( () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId , storedData.token, storedData.admin, new Date(storedData.expiration))
    }
  }, [login])

  return (
    <div className="app">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          isAdmin: isAdmin,
          login: login,
          logout: logout,
        }}
      >
        <Navbar />
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

export default App;