import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import DifficultyLevels from "./components/DifficultyLevels";
import BeginnerTopics from "./components/BeginnerTopics";
import IntermediateTopics from "./components/IntermediateTopics";
import AdvancedTopics from "./components/AdvancedTopics";
import Leaderboard from "./components/Leaderboard";
import Games from "./components/Games";
import GameInterface from "./components/GameInterface";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);
  
  // Login function
  const login = (userData) => {
    setUser(userData);
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
  };
  
  // Register function
  const register = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage login={login} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage login={login} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage register={register} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/login" />} />
            <Route path="/difficulty-levels" element={user ? <DifficultyLevels /> : <Navigate to="/login" />} />
            <Route path="/coding/beginner/topics" element={user ? <BeginnerTopics /> : <Navigate to="/login" />} />
            <Route path="/coding/intermediate/topics" element={user ? <IntermediateTopics /> : <Navigate to="/login" />} />
            <Route path="/coding/advanced/topics" element={user ? <AdvancedTopics /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
            <Route path="/games" element={user ? <Games /> : <Navigate to="/login" />} />
            <Route path="/games/:gameName" element={user ? <GameInterface /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;