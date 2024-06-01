import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ListMovie from './components/ListMovie';
import ListHeading from './components/ListHeading';
import SearchBox from './components/SearchBox';

import HomePage from './components/home';
import LoginPage from './components/login';
import Signup from './components/signup';
import Details from './components/details';
import Profile from './components/Profile';
import Public from './components/Public';


import {
    createBrowserRouter,
    RouterProvider,
    // Route,
    // Link,
  } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';


const App = () =>{

    
    const router = createBrowserRouter([

        {
            path: "/",
            element: (
                <div>
                   <LandingPage/>
                </div>
            )
        },
        {
            path: "/search",
            element: (
                <div>
                    <HomePage />
                </div>
            )
        },
        {
            path: "/login",
            element: (
                <div>
                    <LoginPage />
                </div>
            )
        },
        {
            path: "/signup",
            element: (
                <div>
                    <Signup />
                </div>
            )
        },
        {
            path: "/details/:id",
            element: (
                <div>
                    <Details />
                </div>
            )
        },
        {
            path:"/profile",
            element:(
                <div>
                    <Profile />
                </div>

            )
        },
        {
            path: "/publicPlaylist",
            element: (
                <div>
                    <Public/>
                </div>
            )
        }
    ])
    return (
       <RouterProvider router={router}>
       <Navbar />
       <div className='container-fluid movie'>
        
       
       </div>
     </RouterProvider>
    );
};
export default App;