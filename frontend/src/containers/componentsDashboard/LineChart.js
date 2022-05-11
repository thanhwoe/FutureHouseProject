import React from 'react';
import Chart from "react-apexcharts";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const LineCharts = (props) => {
    const { data, keyY } = props
    const renderCustomAxisTick = ({ x, y, payload }) => {
        let month = ''
        console.log(payload.value)
        switch (payload.value) {
            case 1:
                month = 'Jan'
                break;
            case 2:
                month = 'Feb'
                break;
            case 3:
                month = 'Mar'
                break;
            case 4:
                month = 'Apr'
                break;
            case 5:
                month = 'May'
                break;
            case 6:
                month = 'Jun'
                break;
            case 7:
                month = 'Jul'
                break;
            case 8:
                month = 'Aug'
                break;
            case 9:
                month = 'Sept'
                break;
            case 10:
                month = 'Oct'
                break;
            case 11:
                month = 'Nov'
                break;
            case 12:
                month = 'Dec'
                break;


        }
        return (
            <text x={x - 20} y={y} dy={16} fill="#666">{month}</text>
        )
    };

    function CustomTooltip({ payload, label, active }) {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="label">Total: {payload[0].value}</p>
                </div>
            );
        }

        return null;
    }
    return (
        <LineChart width={1100} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="count" stroke="#5550bd" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey={keyY} tick={renderCustomAxisTick} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
    );
}

export default LineCharts;
