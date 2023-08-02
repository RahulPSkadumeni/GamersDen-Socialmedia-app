import React from "react";

import "./login.css";

// const Login = () => {
//   const theme = useTheme();
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//   return (
//     <Box>
//       <Box width="100%" p="1rem 6%" textAlign="center">
//         <Typography fontWeight="bold" fontSize="32px" color="primary">
//           Gamers-DEN{" "}
//         </Typography>
//       </Box>
//       <Box
//         width={isNonMobileScreens ? "50%" : "93%"}
//         p="2rem"
//         m="2rem auto"
//         borderRadius="1.5rem"
//         backgroundColor={theme.palette.background.alt}
//       ></Box>
//       <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
//         Welcome to Gamers DEN
//       </Typography>

//       <Form />

//       {/* <div>login</div>
//       <div className="login">
//         <div className="loginWrapper">
//           <div className="loginLeft">
//             <h3 className="loginLogo">Gamers-DEN</h3>
//             <span className="loginDesc"></span>
//           </div>
//           <div className="loginRight">
//             <div className="loginBox">
//               <input placeholder="Email" className="loginInput" />

//               <input placeholder="Password" className="loginInput" />
//               <button className="loginButton">Log In</button>
//               <span className="loginForgot">Forgot Password?</span>
//               <button className="loginRegisterButton">
//                 Create a New Account
//               </button>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </Box>
//   );
// };
import { useState } from "react";
import { login } from "../api/usersApi/user";
import { useDispatch } from "react-redux";
import { setLogin } from "./state";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", email, password);
    let res = await login(email, password);
    console.log(res);
    if (res.msg) {
      setErr(res.msg);
    } else {
      dispatch(
        setLogin({
          token: res.token,
          user: res.user,
        })
      );
      navigate("/");
    }

    // TODO: add login logic here
  };

  return (
    <>
      <div className="login min-h-screen  flex flex-col sm:flex-row items-center justify-center">
        <div className="hidden sm:block sm:w-1/2 lg:w-1/2 xl:w-2/4 p-3 m-5 bg-gray-500/50 rounded-3xl rounded-bl-none flex items-center justify-center">
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
        <div className="sm:w-1/2 lg:w-1/3 xl:w-1/4 p-8  rounded-3xl bg-gray-500/50">
          <h1 className="text-4xl font-medium text-white underline mb-4">
            Login
          </h1>
          <h2 className="text-3xl font-medium text-white mb-8">
            Welcome to Gamers-DEN
          </h2>
          <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-white font-thin text-2xl mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="w-full px-3 py-2 rounded-3xl text-3xl leading-tight"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white font-thin text-2xl mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="w-full px-3 py-2 rounded-3xl text-3xl leading-tight"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl font-semibold py-2 px-6 rounded-full"
                type="submit"
              >
                Log In
              </button>
              <a
                className="text-green-400 hover:text-green-500 text-xl font-semibold"
                href="/otp_login"
              >
                Login using OTP
              </a>
            </div>
            <div className="text-center">
              <Link
                to="/register"
                className="block text-sky-400 hover:text-sky-500 font-semibold mb-2 text-xl"
              >
                Create a New Account
              </Link>
              <Link
                to="/changepassword"
                className="block text-gray-400 hover:text-gray-500 font-semibold text-xl"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-red-500 mt-4">{err}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
