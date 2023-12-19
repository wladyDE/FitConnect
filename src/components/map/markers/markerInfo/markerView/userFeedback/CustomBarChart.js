import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Cell,
} from 'recharts';

import React from 'react'

const CustomBarChart = ({ranking}) => {
    const data = [
        { name: '5 stars', value: ranking[5] },
        { name: '4 stars', value: ranking[4] },
        { name: '3 stars', value: ranking[3] },
        { name: '2 stars', value: ranking[2] },
        { name: '1 stars', value: ranking[1] },
    ];

    const COLORS = ['orange'];
    return (
        <BarChart
            width={300}
            height={200}
            data={data}
            layout="vertical"
        >

            <XAxis type="number" stroke="white" tickFormatter={(value) => Number.isInteger(value) ? value : ''} />
            <YAxis dataKey="name" type="category" stroke="white" />
            <Bar dataKey="value" fill="white" >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                }
            </Bar>
        </BarChart>
    )
}

export default CustomBarChart
