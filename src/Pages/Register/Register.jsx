import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import { Oval } from "react-loader-spinner";
import { toast } from "react-hot-toast";
// import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [buttonLoader, setButtonLoader] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // const imgbb = process.env.REACT_APP_imgbb

  const hangleRegister = (data) => {
    setButtonLoader(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    
    const url = `https://api.imgbb.com/1/upload?key=381f7ea874fe4bbe6dc427dd3054e6b1 `;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        // console.log(imgdata);
        if (imgdata.success) {
          // console.log(imgdata.data.url);
          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              // console.log(user);
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
              const userInfo = {
                displayName: data.name,
                photoURL: imgdata.data.url,
              };
              updateUser(userInfo)
                .then((result) => {
                  saveUserToDb(user.displayName, user.email, imgdata.data.url);
                  setButtonLoader(false);
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                  setButtonLoader(false);
                });
            })
            .catch((err) => {
              console.log(err);
              setErrorMessage("Email already in use");

              setButtonLoader(false);
            });
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);

        setButtonLoader(false);
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
        navigate("/");
      })
      .catch((err) => {
        console.log(err);

        setButtonLoader(false);
      });
  };

  const saveUserToDb = (name, email, image) => {
    const user = { name, email, image };
    fetch("https://fable-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
      <div className="lg:ml-20 px-4 lg:px-0">
        <h1 className="font-semibold text-xl mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit(hangleRegister)} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black font-semibold">
                Full Name
              </span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Full name"
              className="input input-bordered lg:w-2/3"
            />
          </div>
          {errors.name && (
            <p role="alert" className="text-error text-xs mt-2">
              {errors.name?.message}
            </p>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black font-semibold">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="email"
              className="input input-bordered lg:w-2/3"
            />
          </div>
          <p className="text-error text-xs mt-2">{errorMessage}</p>
          {errors.email && (
            <p role="alert" className="text-error text-xs mt-2">
              {errors.email?.message}
            </p>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black font-semibold">
                Password
              </span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be atleast 6 characters",
                },
              })}
              placeholder="Password"
              className="input input-bordered lg:w-2/3"
            />
            {errors.password && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black font-semibold">
                Profile Image
              </span>
            </label>
            <input
              type="file"
              {...register("image", { required: "Photo is required" })}
              placeholder="Image"
              className="input input-bordered lg:w-2/3"
            />
            {errors.img && (
              <p role="alert" className="text-error text-xs mt-2">
                {errors.img?.message}
              </p>
            )}
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
                "Sign Up"
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
          Already have an account?{" "}
          <Link className="hover:underline" to="/login">
            Login
          </Link>
        </h1>
      </div>
      <div className="">
        <img src="https://i.ibb.co/7zxLx9Y/Foto-15.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
