import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
// import '../styles/app.css'
// import ImageLight from '../assets/img/login-office.jpeg'
// import ImageDark from '../assets/img/login-office-dark.jpeg'
// import { GithubIcon, TwitterIcon } from '../icons'
// import { Label, Input, Button } from '@windmill/react-ui'

const backgroundImage = 'https://images.unsplash.com/flagged/photo-1569118311341-145748f3f338'

const required = (value) => {
  if (!value) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline"> This field is required!</span>
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Please enter valid email.</span>
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">The password must be more than 6 characters.</span>
      </div>
    );
  }
};

  
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
      e.preventDefault();

      setMessage("");
      setSuccessful(false);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(name, email, password).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };


  return (
    <section className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style={{ backgroundImage:`url(${backgroundImage})`, backgroundSize: "cover",
    height: "100vh", }}>
            <header className="max-w-lg mx-auto">
                <Link to="#">
                    <h1 className="flex text-2xl font-bold text-white text-center justify-center">Welcome to CHATS <p className="text-xs">for NGOs</p></h1>
                </Link>
            </header>

            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                {/* <section>
                    <h3 className="font-bold text-2xl">Welcome,</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section> */}

                <section className="mt-10">
                    <Form className="flex flex-col" onSubmit={handleRegister} ref={form}>
                      {!successful && (
                        <>
                          <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                          Name of Organization
                          </label>
                          <Input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" 
                            name="name" 
                            type="text" 
                            value={name}
                            onChange={onChangeName}
                            validations={[required]}
                            placeholder="" 
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Email
                          </label>
                          <Input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" 
                            name="email" 
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                            type="text" 
                            placeholder="" 
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                          </label>
                          <Input 
                            className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline" 
                            name="password" 
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                            type="password" 
                            placeholder="" 
                          />
                          <p className="text-red-500 text-xs italic"></p>
                        </div>
                        
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Create Account</button>
                      </>
                      )}
                        
                        {message && (
                         
                            <div
                              className={ successful ? "m-8 bg-red-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative justify-center text-center" : "m-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative justify-center text-center" }

                              role="alert"
                            >
                            <strong className="font-bold">{message}</strong>
                            <p>Please click on Login to Signin to your Account!</p>
                            </div>
                          
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        
                    </Form>
                    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                        <p className="text-black">Have an account? <Link to="/login" className="font-bold hover:text-purple-700 hover:underline">Login</Link>.</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to="#" className="text-sm text-black-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</Link>
                    </div>
                </section>
            </main>
            </section>
  )
}

export default Login
