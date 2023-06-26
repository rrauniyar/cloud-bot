import { React, useEffect } from 'react';
import { myAxiosAws } from '../services/helperAws';
import { useState } from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';




export const BarChartComponent = (props) => {
    const open = props.open;
    const [data, setData] = useState([]);
    async function fetchData(year, month) {
        if (month === 0) {
            year = year - 1;
            month = 12;
        }
        const date = new Date(year, month - 1);
        const dateString = date.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' });
        try {

            const startResponse = await myAxiosAws.get("/service-costs", { params: { year: year, month: month } });
            console.log(startResponse);
            const totalcost = startResponse.data["Total Cost"]["Total Cost"];
            setData(prevData => {
                const newData = [...prevData, { date: dateString, cost: totalcost }];
                return newData;
            });

        } catch (error) {
            setData(prevData => {
                const newData = [...prevData, { date: dateString, cost: 0 }];
                return newData;
            })
            console.log(error);
        }
    }


    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        for (let i = 4; i >= 0; i--) {
            const year = currentYear;
            const month = currentMonth - i;
            if (month <= 0) {
                const remainingMonths = Math.abs(month);
                const yearsToSubtract = Math.floor(remainingMonths / 12) + 1;
                year -= yearsToSubtract;
                month = 12 - (remainingMonths % 12);
            }

            fetchData(year, month);
        }
    }, []);



    const BarGraphData = [];


    data.map((key, index) => {
        BarGraphData.push({
            name: key.date,
            uv: key.cost,
            pv: 800,
            amt: key.cost
        })
    })


    BarGraphData.sort((a, b) => a.name.localeCompare(b.name));



    return (
        <div style={{ marginLeft: open ? "12%" : "0px", width: open ? "60%" : "100%" }}>
            <ComposedChart
                width={1240}
                height={400}
                data={BarGraphData}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" name="cost" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" name="cost" stroke="#ff7300" />
            </ComposedChart>
        </div>

    );
}
