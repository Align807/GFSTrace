
import React from 'react'
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import {CategoryScale} from 'chart.js';
import { bar_data } from './Tabledatas';
 Chart.register(CategoryScale)



export default function BarChart() {
  const [data, setData] = React.useState(bar_data);
  const options={
    title:{
      display:true,
      text:'Bar Chart'
    },
    
    scales:{
      yAxes:[
        {
          ticks:{
            min:0,
            max:6,
            stepSize:1
          }
        }
      ]
    }
  }
 
  
  return (
    <div >
     <Bar data={data}
     height={300}
     width={600}
     options={options}
     
     />
     
      
    </div>
  )
}
