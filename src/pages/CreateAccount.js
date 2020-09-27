import React from 'react'
import { Link } from 'react-router-dom'
// import '../styles/app.css'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'

const car = 'https://images.unsplash.com/flagged/photo-1569118311341-145748f3f338'

function Login() {
  return (
    <section className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style={{ backgroundImage:`url(${car})`, backgroundSize: "cover",
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
                    <form className="flex flex-col" method="POST" action="#">
                        {/* <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Name of Organization</label>
                            <input type="text" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div> */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                          Name of Organization
                          </label>
                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="" />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Email
                          </label>
                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="" />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                          </label>
                          <input className="shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="" />
                          <p className="text-red-500 text-xs italic"></p>
                        </div>
                        {/* <div className="flex justify-end">
                            <Link to="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</Link>
                        </div> */}
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Create Account</button>
                    </form>
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
