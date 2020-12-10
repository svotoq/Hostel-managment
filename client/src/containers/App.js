import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from '../routes';
import { useAuth } from '../hooks/auth'
import { AuthContext } from '../context/AuthContext'
import { Header } from '../components/Header'
import 'materialize-css';


function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId
    }}>
      <Router>
        {isAuthenticated && <Header />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;