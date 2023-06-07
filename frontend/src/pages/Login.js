import { useNavigate, useLocation } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
import { myAxios } from '../services/helper';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Animated } from '../utilities/Animations/Animated';
import login from '../images/Login.jpeg';
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props) => {
    let [emailError, setEmailError] = useState('');
    let [passwordError, setPasswordError] = useState('');
    function HandleValidEmail(inputEmail) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (inputEmail.match(validRegex)) {
            return false;
        }
        return true;
    }
    function HandleValidPassword(inputPassword) {
        if (inputPassword.length <= 6) {
            return true;
        }
    }
    function HandleInput() {
        const HandleInputEmail = document.getElementById('email').value;
        const HandleInputPassword = document.getElementById('password').value;
        let flag = 0;
        if (HandleInputEmail.trim() === '') {
            setEmailError('please enter some value');
            flag = 1;
        }
        else {
            setEmailError('');
        }
        if (HandleInputPassword.trim() === '') {
            setPasswordError('please enter some value it cannot be blank');
            flag = 1;
        }
        else {
            setPasswordError('');
        }
        if (HandleInputEmail && HandleValidEmail(HandleInputEmail)) {
            setEmailError('please enter a valid email');
            flag = 1;
        }
        if (HandleInputPassword && HandleValidPassword(HandleInputPassword)) {
            setPasswordError('please enter a password with length greater than 6');
            flag = 1;
        }
        if (flag) {
            return;
        }
        const InputObject = {
            email: HandleInputEmail,
            password: HandleInputPassword
        };
        return InputObject;
    }
    const navigate = useNavigate();
    const location = useLocation();
    const dataFromRegister = location.state;
    let nameOfUser = "USER";
    if (dataFromRegister) {
        nameOfUser = dataFromRegister.name;
    }
    function SubmitHandler(event) {
        event.preventDefault();
        const userData = HandleInput();
        console.log(userData);
        const token = myAxios.post("/auth/login", userData).then((response) => response.data).then((response) => {
            console.log(response);
            if (userData)
                navigate("/home", { state: { name: 'user' } });
        }).catch((tokenerror) => {
            toast("Wrong email or password!", {
                type: "error",
                autoClose: 1500,
                closeButton: true,
                hideProgressBar: true,
            });
            console.log(tokenerror);
        });
        console.log(token);

    }
    // function decodeJwtResponse(token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));

    //     return JSON.parse(jsonPayload);
    // }
    return (
        <div className='login'>
            <Animated image={login} />
            <div className='title'>
                <h2 className='title--heading'>Login in To CloudBot</h2>
                <p className="m-24 title--description">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                </p>
            </div>
            <div className="mt-60 sm:mx-auto sm:w-full sm:max-w-sm ">
                {nameOfUser !== "USER" ? (<div className="block text font-medium leading-10 text-gray-100">Welcome {nameOfUser}</div>) : (<div></div>)}
                <form className="space-y-6" action="/" method="POST" onSubmit={SubmitHandler}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {emailError && (
                            <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
                                Password
                            </label>


                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {passwordError && (
                            <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ "margin": "0" }}>
                            Log in
                        </button>
                    </div>
                </form>
                {/* <div className='google-auth'> <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    const responsePayload = decodeJwtResponse(credentialResponse.credential);
                    console.log("ID: " + responsePayload.sub);
                    console.log('Full Name: ' + responsePayload.name);
                    console.log('Given Name: ' + responsePayload.given_name);
                    console.log('Family Name: ' + responsePayload.family_name);
                    console.log("Image URL: " + responsePayload.picture);
                    console.log("Email: " + responsePayload.email);
                    const GoogleInput = {
                        email: responsePayload.email
                    }
                    myAxios.post("/auth/google-login", GoogleInput).then((response) => response.data).then((response) => {
                        console.log(response);
                        toast("login Succesful!", {
                            type: "success",
                            autoClose: 1500,
                            closeButton: true,
                            hideProgressBar: true,
                        });
                        navigate('/home');

                    }).catch((error) => {

                        if (error.response.request.status >= 400) {
                            toast("no user found!", {
                                type: "error",
                                autoClose: 2500,
                                closeButton: true,
                                hideProgressBar: true
                            });
                        }
                        console.log(error);
                    })
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                theme="filled_black"
                shape="circle"
                style={{
                    width: 20,
                    height: 50,
                    borderRadius: '50%',
                    backgroundImage: 'url("https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    textIndent: '-9999px', // hide text inside button
                    fontSize: 0, // set font size to 0
                }}
            /></div> */}

                <p className="mt-10 text-center text-sm text-gray-400">
                    New here?{' '}
                    <a href="/signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </a>
                </p>
            </div>
        </div>

    )
}



