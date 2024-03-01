import { Progress } from "semantic-ui-react";

export  const fuelTank_data = [
    { farm: 'abc', name: 'we', type: '2', capacity:"50",contents:"50",archived:"yes"},
    { farm: 'abc', name: 'we', type: '1', capacity:"75",contents:"75",archived:"yes"},
    { farm: 'abc', name: 'we', type: '4', capacity:"10",contents:"10",archived:"yes"},
];

export const outgoing_data = [
    {fuelTank:"abc",dateTime:"30/11/2021",operator:"abc",adjustment:"asd",type:"2",equipment :"asd",hours:"asd",milage:"asd",notes:"abc",archived:"yes"},
    {fuelTank:"abc",dateTime:"30/11/2021",operator:"abc",adjustment:"asd",type:"3",equipment :"asd",hours:"asd",milage:"asd",notes:"abc",archived:"yes"},

    
];

export const ingoing_data = [
    {fuelTank:"asd",dateTime:"30/11/2021",operator:"abc",amount:"abc",type:"3",supplier:"abc",notes:"abc",archived:"yes"},
    {fuelTank:"asd",dateTime:"30/11/2021",operator:"abc",amount:"abc",type:"2",supplier:"abc",notes:"abc",archived:"yes"},
        
];


export const total_data = [
    {type:"1",capacity:"34",contents:"44",free:"aabc",contents1:<Progress percent={44} progress color="rgb(68, 63, 63)" />,archived:"yes"},
      {type:"3",capacity:"34",contents:"60",free:"aabc",contents1:<Progress percent={60} progress color="rgb(68, 63, 63)" />,archived:"yes"},
      {type:"2",capacity:"34",contents:"20",free:"aabc",contents1:<Progress percent={20} progress color="rgb(68, 63, 63)" />,archived:"yes"},
];

export const stocktake_data = [
    {fuelTank:"abc",dateTime:"30/12/2020",operator:"asd",reported:"asd",adjustment:"asd",type:"1",archived:"yes"},
    {fuelTank:"abc",dateTime:"30/12/2020",operator:"asd",reported:"asd",adjustment:"asd",type:"3",archived:"yes" },
    {fuelTank:"abc",dateTime:"30/12/2020",operator:"asd",reported:"asd",adjustment:"asd",type:"4" ,archived:"yes"},
];

export const type_data=[
    {id:1,title:"Diesel"},
    {id:2,title:"Unleaded"},
    {id:3,title:"Aviation"},
    {id:4,title:"AdBlue"},
];

