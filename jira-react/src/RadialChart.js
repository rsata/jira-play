import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';

export const GraphRadial = (props) => {
  return(
    <RadarChart cx={300} cy={250} outerRadius={150} width={730} height={500} data={props.chartDataPie}>
      <Radar  dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis angle={30} />
    </RadarChart>
  );
};
