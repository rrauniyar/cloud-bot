import React, { useState } from 'react';
import { myAxiosAws } from '../services/helperAws';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AwsKeysImage from '../images/AwsKeys.webp';
import { Animated } from '../utilities/Animations/Animated';
export const AwsKeys = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        AwsSecretkey: '',
        AwsKey: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                const response = await myAxiosAws.post("/api-keys", { awsAccessKey: formData.AwsKey, awsSecretKey: formData.AwsSecretkey });
                const data = await response.data;
                localStorage.setItem('awsAccessKey', formData.AwsKey);
                localStorage.setItem('awsSecretKey', formData.AwsSecretkey);
                localStorage.setItem('expirationTime', data.expiration_time);
                console.log(data);
                toast("Session Started for 30 minutes!", {
                    type: "success",
                    autoClose: 1500,
                    closeButton: true,
                    hideProgressBar: true,
                });
                navigate("/home");
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    };


    return (
        <div className="signup">
            <Animated image={AwsKeysImage} />
            <div className='title'>
                <h2 className='title--heading'>CloudBot</h2>
                <p className="m-24 title--description">
                Rest assured, we prioritize your privacy and security. With our application, your session is active for 30 minutes, ensuring efficient usage. We never store any secret keys in our database, guaranteeing the utmost safety for your sensitive information. Your privacy is our top priority
                </p>
            </div>
            <div className="form-container">
                <div className="mt-60 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <form className="space-y-6  text-white" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="AwsSecretkey" className="block text-sm mx-2 font-medium leading-6text-white-100">AWS Secret Key:</label>
                            <input
                                type="text"
                                id="AwsSecretkey"
                                name="AwsSecretkey"
                                value={formData.AwsSecretkey}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="AwsKey" className="block text-sm mx-2 font-medium leading-6text-white-100">AWS Access Key:</label>
                            <input
                                type="text"
                                id="AwsKey"
                                name="AwsKey"
                                value={formData.AwsKey}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="flex m-0 w-full justify-center rounded-md bg-indigo-600  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                style={{ margin: "10" }}>Submit</button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text text-gray-200" style={{fontSize:"15px"}}>
                        Don't Have an Aws Account ?{' '}
                        <a href="/chat/0" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-600">
                            Interact with our chatBot
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
