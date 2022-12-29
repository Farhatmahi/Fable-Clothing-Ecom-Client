import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import toast from "react-hot-toast";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import {motion} from 'framer-motion'


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, googleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleLogin = (data) => {
    setButtonLoader(true);
    setLoginError("");
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success(`Welcome ${user.displayName}`, {
          style: {
            padding: "16px",
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: "0",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#000000",
          },
        });
        setButtonLoader(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoginError("Incorrect password");
        setButtonLoader(false);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success(`Welcome ${user.displayName}`, {
          style: {
            padding: "16px",
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: "0",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#000000",
          },
        });
        setButtonLoader(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoginError("Incorrect password");
        setButtonLoader(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 mt-10">
      <div className="lg:ml-20 px-4 lg:px-0">
        <h1 className="font-semibold text-xl mb-8">Sign In</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black font-semibold">Email</span>
            </label>
            <input
              {...register("email", { required: "Please enter your email" })}
              placeholder="email"
              className="input input-bordered lg:w-2/3"
            />
            {errors.email && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black font-semibold">
                Password
              </span>
            </label>
            {/* <input
              type="text"
              placeholder="password"
              className="input input-bordered w-2/3"
            /> */}
            <input
              {...register("password", {
                required: "Please enter your password",
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered lg:w-2/3"
            />

            {errors.password && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.password?.message}
              </p>
            )}
            <p className="text-error text-xs mt-2">{loginError}</p>
            <label className="label">
              <Link href="#" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-black text-white lg:w-2/3">
              {buttonLoader ? (
                <Oval
                  height={20}
                  width={20}
                  color="#c3c3c3"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#a2a2a2"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                "Log in"
              )}
            </button>
            <div className="divider lg:w-2/3">OR</div>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-black text-white w-full lg:w-2/3"
        >
          <span>
            Continue with Google <FcGoogle className="ml-3 inline" />
          </span>
        </button>
        <h1 className="mt-4 text-center lg:w-2/3">
          New here?{" "}
          <Link className="hover:underline" to="/register">
            Create an account
          </Link>
        </h1>
      </div>
      <div className="hidden lg:block">
        <img src="https://i.ibb.co/7zxLx9Y/Foto-15.png" alt="" />
      </div>
    </motion.div>
  );
};

export default Login;
