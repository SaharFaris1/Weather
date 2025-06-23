import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import WeatherPage from '../pages/Weather';
import Nav from "../component/Nav";
import Footer from "../component/Footer";


function Layout() {
    return(
    <>
  <Nav/>
    <Outlet/>

<Footer/>
    </>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
       
        { path: "weather", element: <WeatherPage /> }
      ]
    },
    { index: true, element: <Signup /> },
    { path: "signin", element: <Signin /> }
  ]);
function Router() {
  return (
    <RouterProvider router={router} />
  )
}

export default Router