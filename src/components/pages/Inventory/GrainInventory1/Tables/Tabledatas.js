import { Progress } from "semantic-ui-react";

export  const silos_data = [
    { farm: 'farm1', silo: 'silo1', cultivar: 'wheat', capacity:"50",contents:"60",archived:"Yes",status:"inprogress"},
    { farm: 'farm2', silo: 'silo2', cultivar: 'rice', capacity:"20",contents:"38",archived:"Yes",status:"completed"},
  
];

export const outgoing_data = [
    {id:"abc",silos:"abc",dateTime:"30/11/2021",operators:"abc",contract:"asd",cultivar:"asd",transport:"asd",driver:"asd",rego:"asd",
    tareWeight:"abc",grossWeight:"abc",amount:"abc",endPointAmount:"abc",paddocks:"abc",traits:"abc",notes:"abc",archived:"abc"},

    {id:"abc",silos:"abc",dateTime:"30/11/2021",operators:"abc",contract:"asd",cultivar:"asd",transport:"asd",driver:"asd",rego:"asd",
    tareWeight:"abc",grossWeight:"abc",amount:"abc",endPointAmount:"abc",paddocks:"abc",traits:"abc",notes:"abc",archived:"abc"},
];

export const ingoing_data = [
    {id:"asd",silos:"abc",dateTime:"30/11/2021",operators:"abc",contract:"asd",cultivar:"asd",transport:"asd",driver:"asd",rego:"asd",
        tareWeight:"abc",grossWeight:"abc",amount:"abc",endPointAmount:"abc",paddocks:"abc",traits:"abc",notes:"abc",archived:"yes"},
        {id:"asd",silos:"abc",dateTime:"30/11/2021",operators:"abc",contract:"asd",cultivar:"asd",transport:"asd",driver:"asd",rego:"asd",
        tareWeight:"abc",grossWeight:"abc",amount:"abc",endPointAmount:"abc",paddocks:"abc",traits:"abc",notes:"abc",archived:"no"},
];

export const contracts_data = [
    {status:"completd",contractNo:"234",startDate:"20/10/2021",endDate:"30/11/2021",buyer:"jose",destination:"kerala",commodity:"wheat",fulfilled:"yes",
    quantity:"53",grade:"1",tolerence:"3 months",notes:"note1"},
    {status:"inprogress",contractNo:"53",startDate:"27/08/2021",endDate:"17/10/2021",buyer:"kevin",destination:"goa",commodity:"corn",fulfilled:"no",
    quantity:"28",grade:"2",tolerence:"1 year",notes:"note2"},
    {status:"started",contractNo:"66",startDate:"21/01/2021",endDate:"30/05/2021",buyer:"jacob",destination:"kottayam",commodity:"rice",fulfilled:"partial",
    quantity:"87",grade:"1",tolerence:"6 months",notes:"note3"},
];
export const total_data = [
    {cultivar:"wheat",capacity:"84",contents:"23",free:"yes",contracted:"yes",delivered:"no",remaining:"61"},
      {cultivar:"rice",capacity:"76",contents:"66",free:"no",contracted:"no",delivered:"no",remaining:"10"},
      {cultivar:"corn",capacity:"56",contents:"42",free:"no",contracted:"yes",delivered:"yes",remaining:"14"},
];
export const transfer_data = [
    {id:"abc",silos:"asd",dateTime:"30/12/2020",operators:"asd",cultivar:"asd",amount:"asd",traits:"asd",notes:"asd",archived:"yes", },
    {id:"abc",silos:"asd",dateTime:"30/12/2020",operators:"asd",cultivar:"asd",amount:"asd",traits:"asd",notes:"asd",archived:"no", },
    {id:"abc",silos:"asd",dateTime:"30/12/2020",operators:"asd",cultivar:"asd",amount:"asd",traits:"asd",notes:"asd",archived:"yes", },
];
export const bar_data={
    labels:['silo1','silo2','silo3'],
    datasets: [{
     label: 'farm1 ',
     data: [4, 9, 3],  
     backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
],
borderWidth: 1 }]
  } ;