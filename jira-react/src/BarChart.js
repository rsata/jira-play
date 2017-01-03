import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Bar, Text, Cell } from 'recharts';

export const GraphBar = (props) => {
  return(
    <BarChart width={700} height={350} data={props.chartDataBar}>
     <XAxis dataKey="name" tick={renderVerticalTick} interval={0} height={150} />
     <YAxis/>
     <CartesianGrid strokeDasharray="3 3"/>
     <Bar dataKey="value">
       {props.chartDataBar.map((entry, i) => <Cell key={i} fill={props.colors[i]} />)}
     </Bar>
    </BarChart>
  );
};

const renderVerticalTick = ({ payload, x, y }) => {
  return (
  	<g transform={`translate(${x}, ${y})`}>
    	<text transform="rotate(-90)" textAnchor="end" alignmentBaseline="central">{payload.value}</text>
    </g>
  );
};
