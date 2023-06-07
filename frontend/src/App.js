
import './App.scss';


import { Home } from "./pages/Home";


import { SignUp } from "./pages/SignUp";

import { S3Buckets } from './pages/S3Buckets';

import { Login } from "./pages/Login";

import { LandingPage } from "./pages/Landingpage";

import { ViewServices } from './HomePageComponents/ViewServices';


import { Routes, Route, BrowserRouter } from 'react-router-dom';  //1st argument-exactly where in our app we want the diff routes

// import { useState } from 'react';

import React from 'react';

import { ServiceAnalysis } from './pages/ServiceAnalysis';


import { MonthlyAnalysis } from './pages/MonthlyAnalysis';


import { PieChartMonthAnalysis } from './pages/PieChartMonthAnalysis';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ChatScreen } from './utilities/ChatScreen';

export function App() {

  return (

    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/viewservices" element={<ViewServices />} />;
          <Route exact path="/services/:serviceName" element={<ServiceAnalysis />} />
          <Route path="/month-to-month-analysis" element={<MonthlyAnalysis />} />
          <Route path="/pie-chart-monthly-analysis" element={<PieChartMonthAnalysis />} />
          <Route path="/s3Buckets" element={<S3Buckets />} />
          <Route exact path="/chat/:index" element={<ChatScreen />} />
          
        </Routes>
      </BrowserRouter>

    </div>
  )
}


export default App;