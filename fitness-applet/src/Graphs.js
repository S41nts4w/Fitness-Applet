import React, { Component } from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

export class ChartComponent extends Component{
    render(){
      let data = this.props.data;
      return(
        <div style={{
          paddingBottom: '30%', /* 16:9  56.25% */
          position: 'relative',
          height: 0
        }} >
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          }}>
        <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey="time"/>
          <YAxis/>
          <Legend iconType="circle" wrapperStyle={{ right: 0, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '30px' }} layout="vertical" verticalAlign="middle" align="right"/>
          <Tooltip/>
          <Area type='monotone' dataKey='Squat' stackId="1" stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='Press' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
          <Area type='monotone' dataKey='Bench' stackId="1" stroke='#ffc658' fill='#ffc658' />
        </AreaChart>
        </ResponsiveContainer>
        </div>
        </div>
      )
    }
  }