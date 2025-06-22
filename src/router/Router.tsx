import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import WeatherPage from '../pages/Weather';


function Layout() {
    return(
    <>
  
    <Outlet/>


    </>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        { index: true, element: <Signup /> },
        { path: "signin", element: <Signin /> },
        { path: "weather", element: <WeatherPage /> }
      ]
    }
  ]);
function Router() {
  return (
    <RouterProvider router={router} />
  )
}

export default Router