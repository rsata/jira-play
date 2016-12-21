import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Text } from 'recharts';

export const GraphPie = (props) => {
  return(
    <PieChart width={600} height={500}>
      <Pie data={props.chartDataPie} cx={300} cy={225} outerRadius={180} width={700} fill='#56C5D0' label={<IssueType />} >
        {props.chartDataPie.map((entry, i) => <Cell key={i} fill={props.colors[i]} />)}
      </Pie>
      <Tooltip/>
    </PieChart>
  );
};

const IssueType = (props) => {
  const {x, y, payload} = props;
  return (
    <Text x={x} y={y} fontSize={15} textAnchor="middle">{payload.name}</Text>
  );
};
