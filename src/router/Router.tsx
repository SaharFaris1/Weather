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