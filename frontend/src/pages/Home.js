import { myAxiosAws } from '../services/helperAws';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Navbar } from '../pages/Navbar';
import * as React from 'react';
import { Stats } from '../utilities/Stats';
import { Loading } from '../utilities/Loading';
import { ServicesList } from '../HomePageComponents/ServicesList';
import { ViewServices } from '../HomePageComponents/ViewServices';
import { Months } from '../pages/Months';

export const Home = () => {


    const location = useLocation();
    const dataFromRegister = location.state;
    let nameOfUser = "USER";
    if (dataFromRegister) {
        nameOfUser = dataFromRegister.name;
    }

    const [data, setData] = useState([]);
    const [pricedata, setPriceData] = useState({});
    const [prevMonthPrice, setPrevMonthPrice] = useState({});

    data.sort((a, b) => b.cost_per_month - a.cost_per_month);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const date = new Date();
                let month = date.getMonth();
                let year = date.getFullYear();
                if (month === 0) {
                    month = 12;
                    year = year - 1;
                }
                const response = await myAxiosAws.get("/total-cost");
                console.log(response);
                const prevMonthResponse = await myAxiosAws.get("/service-costs", { params: { year, month } });
                const costdata = response.data.costDetails;
                setPriceData({
                    totalCostPerHour: `${response.data.totalCostPerHour}`,
                    totalCostPerMonth: `${response.data.totalCostPerMonth}`,
                    totalCostPerYear: `${response.data.totalCostPerYear}`
                });
                setData(costdata);
                setPrevMonthPrice(prevMonthResponse.data["Total Cost"]["Total Cost"]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const servicesArray = data.map((obj) => obj.service_name);
    const costData = data.map((obj) => obj.cost_per_month);
    return (
        <div>
            welcome {nameOfUser}
            <Navbar />
            <div className='HomePage'>
                <div>
                    {data.length > 0 ? (<div> <Stats sumOfCostPerHour={pricedata.totalCostPerHour} sumOfCostPerMonth={pricedata.totalCostPerMonth} sumOfCostPerYear={pricedata.totalCostPerYear} prevMonthTotalCost={prevMonthPrice} />
                        <div className='HomePage__services'>
                            <ServicesList data={data} />
                            <ViewServices Data={data} servicesArray={servicesArray} costData={costData}/>
                            <Months/>
                        </div></div>) : (<Loading />)}

                </div>
            </div>


        </div>
    )
}    