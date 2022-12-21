import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Cart from "../Pages/Cart/Cart";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import ProductPage from "../Pages/ProductPage/ProductPage";
import Register from "../Pages/Register/Register";
import Shop from "../Pages/Shop/Shop/Shop";
import PrivateRoute from "./PrivateRoute";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop/product/:id",
        element: <ProductPage />,
        loader: async ({ params }) =>
          fetch(`https://fable-server.vercel.app/product/${params.id}`),
      },
      {
        path : '/cart',
        element : <PrivateRoute><Cart /></PrivateRoute>
      }
    ],
  },
]);

export default routes;
