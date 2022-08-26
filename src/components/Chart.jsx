import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,

        },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    maintainAspectRatio: false,
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            fill: false,
            data: labels.map((l, i) => i),
            borderColor: '#3E64FF',
            backgroundColor: '#FFFFFF',


        },
    ],

};


const Chart = () => {
    return (
        <div className='chart_wrap'>
            <Line 
            style={{
                height: 320,
                padding: "16px 20px"
            }} options={options} data={data}
            />
        </div>
    )
}

export default Chart