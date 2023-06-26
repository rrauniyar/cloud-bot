import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LocalStorageComponent = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const startTokenExpirationChecker = () => {
            const expirationChecker = setInterval(() => {
                const expirationTime = localStorage.getItem('expirationTime');
                console.log(expirationTime);
                const currentDate = new Date();
                const dateString = currentDate.toDateString();
                const timeString = currentDate.toLocaleTimeString();
                console.log("break");
                const formattedDate = `${dateString} ${timeString}`;
                console.log(formattedDate);
                if (expirationTime && expirationTime.length > 0 && formattedDate > expirationTime) {
                    console.log("gg");
                    clearInterval(expirationChecker);
                    handleLogout();

                }
            }, 60000); // 1 minute


        };

        startTokenExpirationChecker();

        return () => {
            // clearInterval(expirationChecker);
        };
    }, []);

    const handleLogout = () => {
        navigate("/aws-keys");
        // clearInterval(expirationChecker);
        localStorage.removeItem('awsAccessKey');
        localStorage.removeItem('awsSecretKey');
        localStorage.removeItem('expirationTime');


    };
    return (
        <div>
        </div>
    )
}