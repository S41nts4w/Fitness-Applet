import React, { Component } from 'react';
import {getStatistics} from './Store';
import _ from 'lodash';

export class StatisticPage extends Component{
    render(){
        const getData = () =>{
            let test = "";
            _.forEach(getStatistics(this.props.username), (val, key)=> test += `${key}: ${val} \n`);
            return test;
        }
        return (
            <div>{getData()}</div>
        );
    }
}