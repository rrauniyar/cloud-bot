
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SignUpService } from '../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Animated } from '../utilities/Animations/Animated';
import CloudDev from '../images/CloudDev.webp';



export const SignUp = () => {

    const navigate = useNavigate();
    let [emailError, setEmailError] = useState('');
    let [passwordError, setPasswordError] = useState('');
    let [nameError, setNameError] = useState('');
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
    function HandleValidName(inputName) {
        if (inputName.length < 3) {
            return true;
        }

    }
    function HandleInput() {
        const HandleInputEmail = document.getElementById('email').value;
        const HandleInputPassword = document.getElementById('password').value;
        const HandleInputName = document.getElementById('name').value;
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

        if (HandleInputName.trim() === '') {
            setNameError('please enter some value cannot be blank');
            flag = 1;
        }
        else {
            setNameError('');
        }
        if (HandleInputEmail && HandleValidEmail(HandleInputEmail)) {
            setEmailError('please enter a valid email');
            flag = 1;
        }
        if (HandleInputPassword && HandleValidPassword(HandleInputPassword)) {
            setPasswordError('please enter a password with length greater than 6');
            flag = 1;
        }

        if (HandleInputName && HandleValidName(HandleInputName)) {
            setNameError('please enter a name with more than 2 characters')
            flag=1;
        }
        if (flag) {
            return;
        }
        const InputObject = {
            email: HandleInputEmail,
            password: HandleInputPassword,
            name: HandleInputName
        };
        return InputObject;
    }
    function SubmitHandler(event) {

        event.preventDefault();
        const dataFromInput = HandleInput();
        if (dataFromInput) {
            SignUpService(dataFromInput).then((response) => {
                console.log(response);
                if (dataFromInput) {
                    toast("You've successfully registered!", {
                        type: "success",
                        autoClose: 1500,
                        closeButton: true,
                        hideProgressBar: true,
                    });
                    navigate('/login', { state: dataFromInput });
                }
            }).catch((error) => {
                if (error.response.request.status === 400) {
                    toast("UserName exists!", {
                        type: "error",
                        autoClose: 2500,
                        closeButton: true,
                        hideProgressBar: true
                    });
                }

                console.log(error);
            })
        }

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
        <div className="signup">
            <Animated image={CloudDev} />
            <div className='title'>
                <h2 className='title--heading'>SignUp to CloudBot</h2>
                <p className="m-20 title--description">
                Welcome to our cost optimizing tool for AWS! Chat with our knowledgeable chatbot to get instant answers to your queries about AWS, GCP, or Azure. Track and manage your costs efficiently by viewing detailed cost breakdowns for your AWS account. Start optimizing today!
                </p>
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6  text-white" action="/" method="POST" onSubmit={SubmitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700"
                                />
                            </div>
                            {emailError && (
                                <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">
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
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700"
                            />
                            {passwordError && (
                                <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-400">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-4  text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700"
                                />
                            </div>
                            {nameError && (
                                <p className="mt-1 text-red-500 text-sm">{nameError}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                style={{ margin: "0" }}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    {/* <div className='google-auth'>
                    <GoogleLogin
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
                                email: responsePayload.email,
                                name: responsePayload.name
                            }
                            myAxios.post("/auth/google-signUp", GoogleInput).then((response) => response.data).then((response) => {
                                console.log(response);
                                toast("You've successfully registered!", {
                                    type: "success",
                                    autoClose: 1500,
                                    closeButton: true,
                                    hideProgressBar: true,
                                });
                                navigate('/login', { state: GoogleInput });

                            }).catch((error) => {
                                if (error.response.request.status === 400) {
                                    toast("UserName exists!", {
                                        type: "error",
                                        autoClose: 2500,
                                        closeButton: true,
                                        hideProgressBar: true,
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
                    />
                </div> */}

                    <p className="mt-10 text-center text-sm text-gray-100">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold leading-6 text-blue-500 hover:text-blue-700 underline">
                            Login Here
                        </a>



                    </p>
                </div>
            </div>
        </div>


    )
}
