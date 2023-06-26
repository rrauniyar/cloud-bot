
import './App.scss';


import { Home } from "./pages/Home";


import { SignUp } from "./pages/SignUp";

import { S3Buckets } from './pages/S3Buckets';

import { Login } from "./pages/Login";





import { EC2Instances } from './pages/EC2Instances';

import { AwsKeys } from './pages/AwsKeys';



import { Routes, Route, BrowserRouter } from 'react-router-dom';  //1st argument-exactly where in our app we want the diff routes

// import { useState } from 'react';

import React from 'react';

import { Bill } from './pages/Bill';

import { MonthlyAnalysis } from './pages/MonthlyAnalysis';


import { PieChartMonthAnalysis } from './pages/PieChartMonthAnalysis';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ChatScreen } from './utilities/ChatScreen';

import { LocalStorageComponent } from './utilities/LocalStorageComponent';

import { ChatProvider } from './utilities/ChatProvider';

import { toast } from 'react-toastify';

import { AllEc2Instances } from './pages/AllEc2Instances';

import { RDS } from './pages/RDS';

export function App() {

  if (localStorage.getItem('expirationTime')) {
    const expirationTime = localStorage.getItem('expirationTime');
    console.log(expirationTime);
    const currentTime = new Date();
    const pastTime = new Date(expirationTime);

    const timeDifferenceInSeconds = Math.abs(Math.round((currentTime - pastTime) / 1000));

    console.log(timeDifferenceInSeconds);

    if (timeDifferenceInSeconds >= 295 && timeDifferenceInSeconds <= 305) {
      toast("Session ends in 5 minutes", {
        type: "success",
        autoClose: 1500,
        closeButton: true,
        hideProgressBar: true,
      });
    }

    if (timeDifferenceInSeconds >= 55 && timeDifferenceInSeconds <= 65) {
      toast("Session ends in 1 minute", {
        type: "success",
        autoClose: 1500,
        closeButton: true,
        hideProgressBar: true,
      });
    }



  }

  return (

    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        <ChatProvider />
        <LocalStorageComponent />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/month-to-month-analysis" element={<MonthlyAnalysis />} />
          <Route path="/pie-chart-monthly-analysis" element={<PieChartMonthAnalysis />} />
          <Route path="/s3Buckets" element={<S3Buckets />} />
          <Route path="/aws-keys" element={<AwsKeys />} />
          <Route exact path="/chat/:index" element={<ChatScreen />} />
          <Route path="/EC2Instances/per-day" element={<EC2Instances daytype={"per-day"} daynumber={"one"} />} />
          <Route path="/EC2Instances/three-day" element={<EC2Instances daytype={"three-day"} daynumber={"three"} />} />
          <Route path="/EC2Instances/five-day" element={<EC2Instances daytype={"five-day"} daynumber={"five"} />} />
          <Route path="/EC2Instances/seven-day" element={<EC2Instances daytype={"seven-day"} daynumber={"seven"} />} />
          <Route path="/EC2Instances/any-no-of-days" element={<EC2Instances daytype={"average-cpu-utilization"} takeinput={"true"} />} />
          <Route path="/AllEc2Instances" element={<AllEc2Instances />} />
          <Route path="/Bill" element={<Bill />} />
          <Route path="/rds" element={<RDS />} />

        </Routes>

      </BrowserRouter>

    </div >
  )
}


export default App;