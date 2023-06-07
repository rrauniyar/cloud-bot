
import {
    Chart as ChartJS,
    ArcElement,
    Legend,
    Tooltip
} from 'chart.js';
import { Component } from 'react';

import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Legend,
    Tooltip
)


class   PieChart extends Component {
    render() {
        const dataLength = this.props.costData.length;
        const colors = [
            'rgba(55, 126, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(155, 59, 164, 0.2)',
            'rgba(185, 159, 168, 0.2)',
            'rgba(215, 189, 64, 0.2)',
            'rgba(5, 109, 24, 0.2)',
            'rgba(25, 119, 114, 0.2)',
            'rgba(215, 109, 54, 0.2)',
            'rgba(15, 219, 34, 0.2)',
            'rgba(2, 1, 0, 0.2)'
        ].slice(0, dataLength); // select only the needed colors

        const data = {
            labels: this.props.servicesArray,
            datasets: [{
                label: 'Costs',
                data: this.props.costData,
                backgroundColor: colors,
                borderColor: colors.map(c => c.replace('0.2', '1')),
                borderWidth: 1
            }]
        };
        const options = {
            plugins: {
                tooltips: {
                    callbacks: {
                        
                    }
                }
            },
            legend: {
                labels: {
                    filter: function (legendItem, chartData) {
                        return true;
                    }
                }
            },
        };
        return (
            <div style={{ padding: '20px', width: '50%' }}>
                <Pie data={data} options={options} />
            </div>
        )
    }
}

export default PieChart;
