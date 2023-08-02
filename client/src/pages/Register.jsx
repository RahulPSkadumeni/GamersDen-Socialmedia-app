import React from "react";
import "./Register.css";

import { useState } from "react";
import { register } from "../api/usersApi/user";
import { useDispatch } from "react-redux";
import { setLogin } from "./state";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await register(values);
    console.log(res);

    navigate("/login");
    // TODO: add login logic here
  };
  return (
    <>
      <div className="login min-h-screen  flex flex-col sm:flex-row items-center justify-center">
        <div className="hidden sm:block sm:w-1/2 lg:w-1/4 xl:w-1/3 p-3 m-5 bg-gray-500/50 rounded-3xl rounded-bl-none flex items-center justify-center">
          <div>
            <h3 className=" text-5xl font-bold  text-white">Gamers-DEN</h3>
            {/* <img
              className="h-96"
              src={process.env.PUBLIC_URL + "/assets/"}
              alt="loginimage"
            /> */}
            {/* <a href="https://lovepik.com/images/png-web.html">
              Web Png vectors by Lovepik.com
            </a> */}
          </div>
        </div>
        <div className="sm:w-1/2 lg:w-1/3 xl:w-2/4 p-8  rounded-3xl bg-gray-500/50">
          <h1 className="text-4xl font-medium text-white underline mb-4 m-1">
            Sign Up
          </h1>
          <h2 className="text-center   leading-normal  text-white font-thin text-3xl mb-6">
            Welcome to Gamers DEN
          </h2>
          <form className="display  w-2/3  " onSubmit={handleSubmit}>
            <div className="">
              <div className="flex flex-row mt-10">
                <div className="ml-3">
                  <label
                    className=" text-white font-thin text-2xl  mb-6"
                    htmlFor="firstName md:text-left"
                  >
                    FirstName:
                  </label>
                  <input
                    className="text-3xl rounded-3xl loginInput"
                    type="text"
                    id="firstName"
                    value={values.firstName}
                    onChange={(event) =>
                      setValues({
                        ...values,
                        firstName: event.target.value,
                      })
                    }
                    required
                  />
                  <label
                    className=" text-white font-thin text-2xl mb-6"
                    htmlFor="secondName"
                  >
                    LastName:
                  </label>
                  <input
                    className="text-3xl rounded-3xl loginInput"
                    type="text"
                    id="lastName"
                    value={values.lastName}
                    onChange={(event) =>
                      setValues({
                        ...values,
                        lastName: event.target.value,
                      })
                    }
                    required
                  />
                  <label
                    className=" text-white font-thin text-2xl mb-6"
                    htmlFor="secondName"
                  >
                    userName:
                  </label>
                  <input
                    className="text-3xl rounded-3xl loginInput"
                    type="text"
                    id="lastName"
                    value={values.userName}
                    onChange={(event) =>
                      setValues({
                        ...values,
                        userName: event.target.value,
                      })
                    }
                    required
                  />

                  <label
                    className=" text-white font-thin text-2xl mb-6"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="text-3xl rounded-3xl loginInput"
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={(event) =>
                      setValues({ ...values, email: event.target.value })
                    }
                    required
                  />
                </div>
                <div className="ml-3">
                  <label
                    className=" text-white font-thin text-2xl mb-6"
                    htmlFor="email"
                  >
                    phone no:
                  </label>
                  <input
                    className="text-3xl rounded-3xl"
                    type="number"
                    id="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(event) =>
                      setValues({ ...values, phoneNumber: event.target.value })
                    }
                    required
                  />

                  <label
                    className=" text-white rounded-3xl font-thin text-2xl mb-6"
                    htmlFor=" password"
                  >
                    Password:
                  </label>
                  <input
                    className="text-3xl rounded-3xl"
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={(event) =>
                      setValues({ ...values, password: event.target.value })
                    }
                    required
                  />
                  <button
                    className="bg-emerald-500 text-2xl text-white w-fit pr-24 pl-24 mx-auto p-4 my-10 rounded-full"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="pl-56 my-3">
            <span className="text-white w-fit ml-16  p-4 rounded-full">
              Already have account?{" "}
              <span className=" font-semibold text-sky-400 text-xl">
                <Link to="/"> Login Here</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
