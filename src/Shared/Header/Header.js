import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const {data : cart = []} = useQuery({
    queryKey : ['cart', user?.email], 
    queryFn : async() => {
      const res = await fetch(`http://localhost:1000/cartFilteredByUser?email=${user?.email}`)
      const data = await res.json()
      return data
    }
  })


  const handleLogOut = (e) => {
    e.preventDefault();
    logout()
      .then((result) => {
        // setCart({})
      })
      .catch((err) => {});
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/shop">SHOP</Link>
      </li>
      <li>
        <Link to="login" className="uppercase lg:hidden">
          Login/SignUp
        </Link>
      </li>
      {/* <li tabIndex={0}>
        <Link className="justify-between">
          COLLECTIONS
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </Link>
        <ul className="p-2 bg-base-200">
          <li>
            <Link>JACKETS</Link>
          </li>
          <li>
            <Link>TROUSERS</Link>
          </li>
          <li>
            <Link>SHORTS</Link>
          </li>
        </ul>
      </li> */}
      {/* <li>
        <Link to="/">SALES</Link>
      </li> */}
    </>
  );
  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* <li>
              <Link>Item 1</Link>
            </li>
            <li tabIndex={0}>
              <Link className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </Link>
              <ul className="p-2">
                <li>
                  <Link>Submenu 1</Link>
                </li>
                <li>
                  <Link>Submenu 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link>Item 3</Link>
            </li> */}
            {menuItems}
          </ul>
        </div>
        <Link className="hidden lg:block">
          <img src="https://i.ibb.co/vcCRtMp/logo.png" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {/* <li>
            <Link>Item 1</Link>
          </li>
          <li tabIndex={0}>
            <Link>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </Link>
            <ul className="p-2">
              <li>
                <Link>Submenu 1</Link>
              </li>
              <li>
                <Link>Submenu 2</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link>Item 3</Link>
          </li> */}
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex justify-between items-center">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle mr-4">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cart.length} Items</span>
                <span className="">Subtotal: € 
                </span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link>Settings</Link>
                </li>
                <li>
                  <Link onClick={handleLogOut}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn bg-black text-white">
              <button className="uppercase hidden lg:block">
                Login/Sign up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
