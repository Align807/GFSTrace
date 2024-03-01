import { Progress } from "semantic-ui-react";

export  const silos_data = [
    { farm: 'abc', silo: 'we', cultivar: 'wq', capacity:"50",contents:"60",status:"asd"},
    { farm: 'abc', silo: 'we', cultivar: 'wq', capacity:"50",contents:"44",status:"asd"},
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
    {status:"asd",contractNo:"asd",startDate:"20/10/2021",endDate:"30/11/2021",buyer:"asd",destination:"asd",commodity:"asd",fulfilled:"asd",
    quantity:"asd",grade:"asd",tolerence:"asd",notes:"asd"},
    {status:"asd",contractNo:"asd",startDate:"20/10/2021",endDate:"30/11/2021",buyer:"asd",destination:"asd",commodity:"asd",fulfilled:"asd",
    quantity:"asd",grade:"asd",tolerence:"asd",notes:"asd"},
];
export const total_data = [
    {cultivar:"abc",capacity:"34",contents:"44",free:"aabc",contracted:"abc",delivered:"abc",remaining:"abc"},
      {cultivar:"abc",capacity:"34",contents:"44",free:"aabc",contracted:"abc",delivered:"abc",remaining:"abc"},
      {cultivar:"abc",capacity:"34",contents:"44",free:"aabc",contracted:"abc",delivered:"abc",remaining:"abc"},
];
export const transfer_data = [
    {id:"abc",silos:"asd",dateTime:"30/12/2020",operators:"asd",cultivar:"asd",amount:"asd",traits:"asd",notes:"asd",archived:"yes", },
    {id:"abc",silos:"asd",dateTime:"30/12/2020",operators:"asd",cultivar:"asd",amount:"asd",traits:"asd",notes:"asd",archived:"no", },
    {id:"abc",silos:"asd",dateTime:"30/12/2020",operators:"asd",cultivar:"asd",amount:"asd",traits:"asd",notes:"asd",archived:"yes", },
];
export const bar_data={
    labels:['Red','Blue','Yellow','Green','Purple','Orange'],
    datasets: [{
     label: 'new farm abc',
     data: [4, 9, 3, 5, 2, 3],  
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