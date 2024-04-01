import React from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'  

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import HeroRegister from './components/HeroRegister/HeroRegister.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path: '/login',
        element:<Login></Login>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path:'/register',
        element: <Register/>
      },
      {
        path: '/heroRegister',
        element: <HeroRegister/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
