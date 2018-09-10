import React, { Component } from 'react';
import {getStatistics} from './Store';
import _ from 'lodash';

export class StatisticPage extends Component{
    render(){
        const getData = () =>{
            let test = "";
            test = _.map(getStatistics(this.props.username), (val, key)=> {
                return <p>{`${key}: ${val}`}</p>;
            });
            return test;
        }
        return (
            <div>
                <h2>Statistics</h2>
            {getData()}
            </div>
        );
    }
}