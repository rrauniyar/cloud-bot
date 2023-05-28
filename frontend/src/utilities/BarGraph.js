
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export const BarGraph = (props) => {
    const apidata = props.data;
    apidata.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });
  
    const labels = apidata.map(obj => obj.date);
    const options = {
        responsive: true,
        plugins: {
            legend: {
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Cost',
                data: props.data.map(obj => obj.cost),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };
    return (
        <Bar options={options} data={data} />
    )
}