// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

console.log("AuthContext: Provider is rendering..."); // <-- ADD THIS LINE

const AuthContext = createContext();
// ... keep the rest of the file the same