import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator"

import AuthService from "../services/auth.service";

const backgroundImage = 'https://res.cloudinary.com/emmaodia/image/upload/v1601308326/NGOphotos_rfrllr.jpg'

const required = value => {
  if (!value) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">This field is required!</span>
      </div>
    );
  }
};

const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Please enter a valid email address.</span>
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          props.history.push("/app/dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <section className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style={{ backgroundImage:`url(${backgroundImage})`, backgroundSize: "cover",
    height: "100vh", }}>
            <header className="max-w-lg mx-auto">
                <img src={require('../assets/img/chats-transparent.png')} alt="CHATS logo" />
                <div>
                    <h1 className="flex text-2xl font-bold font-family-Gilroy-Bold text-white text-center justify-center">Welcome to CHATS</h1>
                </div>
            </header>

            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                {/* <section>
                    <h3 className="font-bold text-2xl">Welcome,</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section> */}

                <section className="mt-10">
                    <Form className="flex flex-col" onSubmit={handleLogin} ref={form}>
                        {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Name of Organization</label>
                            <input type="text" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div> */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Email
                          </label>
                          <Input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" 
                            name="email" 
                            onChange={onChangeEmail}
                            type="text" 
                            validations={[required, validEmail]} 
                            placeholder="" 
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                          </label>
                          <Input 
                            className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" 
                            name="password" 
                            onChange={onChangePassword}
                            type="password" 
                            validations={[required]} 
                            placeholder="" 
                          />
                          <p className="text-red-500 text-xs italic"></p>
                        </div>
                        {/* <div className="flex justify-end">
                            <Link to="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</Link>
                        </div> */}
                        {/* <Link to='/app/dashboard' className="bg-purple-600 hover:bg-purple-700 text-white text-center font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" 
                        // type="submit"
                        >Login
                        </Link> */}
                        {/* <div className="form-group"> */}
                        <button className="bg-purple-600 hover:bg-purple-700 text-white text-center font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" disabled={loading}>
                            {loading && (
                              // <span className="spinner-border spinner-border-sm"></span>
                              // <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                              // </svg>
                              <div>Page Loading... Please wait!</div>
                            )}
                            <span >Login</span>
                          </button>
                        {/* </div> */}

                        {message && (
                          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                          {/* <strong class="font-bold">Holy smokes!</strong> */}
                           <span class="block sm:inline">{message}</span>
                          </div>
                          // <div className="form-group">
                          //   <div className="alert alert-danger" role="alert">
                          //     {message}
                          //   </div>
                          // </div>
                        )}
                        <CheckButton
                          style={{ display: "none" }}
                          ref={checkBtn}
                        />
                    </Form>
                    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                        <p className="text-black">Don't have an account? <Link to="/create-account" className="font-bold hover:text-purple-700 hover:underline">Sign Up</Link>.</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to="#" className="text-sm text-black-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</Link>
                    </div>
                </section>
            </main>

            {/* <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                <p className="text-white">Don't have an account? <Link to="#" className="font-bold hover:underline">Sign Up</Link>.</p>
            </div> */}

            {/* <footer className="max-w-lg mx-auto flex justify-center text-white">
                <Link to="#" className="hover:underline">Contact</Link>
                <span className="mx-3">•</span>
                <Link to="#" className="hover:underline">Privacy</Link>
            </footer> */}
            </section>

    // <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    //   <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800">
    //      <div className="flex flex-col overflow-y-auto md:flex-row"> 
    //        <div className="h-32 md:h-auto md:w-1/2">
    //         <img
    //           aria-hidden="true"
    //           className="object-cover w-full h-full dark:hidden"
    //           src={ImageLight}
    //           alt="Office"
    //         />
    //         <img
    //           aria-hidden="true"
    //           className="hidden object-cover w-full h-full dark:block"
    //           src={ImageDark}
    //           alt="Office"
    //         />
    //       </div>
    //       <main className="flex items-center justify-center p-6 sm:p-12">
    //         <div className="w-full">
    //           <Label>
    //             <span>Email</span>
    //             <Input className="mt-1" type="email" placeholder="john@doe.com" />
    //           </Label>

    //           <Label className="mt-4">
    //             <span>Password</span>
    //             <Input className="mt-1" type="password" placeholder="***************" />
    //           </Label>

    //           <Button className="mt-4" block tag={Link} to="/app">
    //             Log in
    //           </Button>

    //           <hr className="my-8" />

    //           <p className="mt-4">
    //             <Link
    //               className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
    //               to="/create-account"
    //             >
    //               Dont have an Account? Sign Up
    //             </Link>
    //           </p>
    //           <p className="mt-1">
    //             <Link
    //               className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
    //               to="/forgot-password"
    //             >
    //               Forgot your password?
    //             </Link>
    //           </p>
    //         </div>
    //       </main>
    //     </div>
       
    //       <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
    //             Email
    //           </label>
    //           <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="" />
    //         </div>
    //         <div className="mb-6">
    //           <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
    //             Password
    //           </label>
    //           <input className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="" />
    //           <p className="text-red-500 text-xs italic"></p>
    //         </div>
    //         <div className="flex items-center justify-between">
    //           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    //             Sign In
    //           </button>
    //           <Link to className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
    //             Forgot Password?
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    // </div>
  )
}

export default Login


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Label, Input, Button } from '@windmill/react-ui'
// import '../styles/app.css'

// function Login() {
//     return (
//         <>
//             <section class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style={{font:'Lato'}}>
//             <header className="max-w-lg mx-auto">
//                 <Link to="#">
//                     <h1 className="text-4xl font-bold text-white text-center">Chats NGO</h1>
//                 </Link>
//             </header>

//             <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
//                 <section>
//                     <h3 className="font-bold text-2xl">Welcome,</h3>
//                     <p className="text-gray-600 pt-2">Sign in to your account.</p>
//                 </section>

//                 <div className="w-full">
//               <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
//               <Label>
//                 <span>Email</span>
//                 <Input className="mt-1" type="email" placeholder="john@doe.com" />
//               </Label>

//               <Label className="mt-4">
//                 <span>Password</span>
//                 <Input className="mt-1" type="password" placeholder="***************" />
//               </Label>

//               <Button className="mt-4" block tag={Link} to="/app">
//                 Log in
//               </Button>

//               <hr className="my-8" />

             

//               <p className="mt-4">
//                 <Link
//                   className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
//                   to="/forgot-password"
//                 >
//                   Forgot your password?
//                 </Link>
//               </p>
//               <p className="mt-1">
//                 <Link
//                   className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
//                   to="/create-account"
//                 >
//                   Create account
//                 </Link>
//               </p>
//             </div>
//             </main>

//             <div className="max-w-lg mx-auto text-center mt-12 mb-6">
//                 <p className="text-white">Have an account? <Link to="#" className="font-bold hover:underline">Login</Link>.</p>
//             </div>

//             <footer className="max-w-lg mx-auto flex justify-center text-white">
//                 <Link to="#" className="hover:underline">Contact</Link>
//                 <span className="mx-3">•</span>
//                 <Link to="#" className="hover:underline">Privacy</Link>
//             </footer>
//             </section>
//         </>
//     )   
// }

// export default Login;