import Axios from 'axios';

const SIGNUP_API_URL = `https://chats-backend.herokuapp.com/api/v1/ngo/auth/register`;
const SIGNIN_API_URL = `https://chats-backend.herokuapp.com/api/v1/ngo/auth/login`;


const login = (email, password) => {
        return Axios
                .post(SIGNIN_API_URL, {
                    email,
                    password
                })
                .then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem('organization', JSON.stringify(response.data));
                    }

                    console.log(response.data)
                    return response.data
                })
    }

const logout = () => {
        localStorage.removeItem('organization');
    }

const register = (name, email, password) => {
        return Axios
                .post(SIGNUP_API_URL, {
                    name, email, password
                })
    }

const getCurrentNGO = () => {
        return JSON.parse(localStorage.getItem('organization'))
    }


export default {
    register,
  login,
  logout,
  getCurrentNGO,
}