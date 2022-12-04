import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Shop from "../Pages/Shop/Shop/Shop";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path : '/login',
        element : <Login />
      },
      {
        path : '/register',
        element : <Register />
      }
    ],
  },
]);

export default routes;
