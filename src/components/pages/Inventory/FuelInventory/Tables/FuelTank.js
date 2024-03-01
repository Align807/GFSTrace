import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { type_data } from "./Tabledatas";
import "../Fuel.css";
import "./archived.css";
import Export from "./export.png";
import axios from 'axios';

export default function FuelTank() {
  const [farm, setfarm] = React.useState([]);
   var obj = farm.reduce(function (acc, cur, i) {
    acc[cur.farmid] = cur.farm_name;

    return acc;
  }, {});
  const [selected, toggleselected] = React.useState(false);
  const [type, setType] = useState({});
  const [data, setData] = React.useState([]);
  const [check, setcheck] = React.useState();
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);
  
  const getfarms = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARMS",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farmsgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setfarm(response.data);
    }

  }
 
  const getfueltank = async () => {
    var json = {
      "paramObject": {
        "queryId": "FARMER_FARMFUELTANK",
        "paramArray": [db.data[0].user_id],
        "strCallerFunction": "DEMO DATA"
      }
    };

    var response = await axios.post('http://localhost:3002/farm_fueltanksgenericselect', json)

    //console.log(JSON.stringify(response.data))
    if (response) {
      setData(response.data);
      console.log(response.data)
    }
  }
  useEffect(() => {
    getfarms();
    getfueltank();

  }, [check]);

  const columns = [
    {
      title: "Farm",
      field: "farmid", filtering: false,lookup: obj,
    },
    {
      title: "Name",
      field: "ft_name", filtering: false,
    },
    {
      title: "Type",
      field: "ft_type", lookup: type,
    },

    {
      title: "Capacity",
      field: "ft_capacity", filtering: false,
    },
    {
      title: 'Unit', field: 'ft_capacityunits',
      lookup: { '0': 'Litres', '1': 'Gallons' },
    },
    // {
    //   title: "Contents",
    //   field: "contents",filtering:false,
    // },
    // {
    //   title: "Contents",
    //   field: "contents",filtering:false,
    // },
    // {
    //   title: "Contents",
    //   field: "ft_capacity",filtering:false,
    //   render: rowData => {
    //     return <Progress percent={rowData.ft_capacity} progress color="rgb(68, 63, 63)" />
    //   }
    // },


  ]
  const columns_archived = [
    {
      title: "Farm",
      field: "farm", filtering: false,
    },
    {
      title: "Name",
      field: "ft_name", filtering: false,
    },
    {
      title: "Type",
      field: "ft_type", lookup: type,
    },

    {
      title: "Capacity",
      field: "ft_capacity", filtering: false,
    },
    {
      title: 'Unit', field: 'ft_capacityunits',
      lookup: { '0': 'Litres', '1': 'Gallons' },
    },
    // {
    //   title: "Capacity Contents",
    //   field: "ft_capacity",filtering:false,
    //   render: rowData => {
    //     return <Progress percent={rowData.contents} progress color="rgb(68, 63, 63)" />
    //   }

    // },
    {
      title: "Archived",
      field: "archived", filtering: false, lookup: {
        '0': 'No',
        '1': 'Yes'
      }
    },
  ];
  useEffect(() => {
    const type = {};
    type_data.map((row) => (type[row.id] = row.title));
    setType(type);
  }, []);
  return (
    <div>
      <MaterialTable
        title="FUEL TANK"
        data={data}
        columns={selected ? columns_archived : columns}
        // columns={columns}
        // detailPanel={(rowData) => {
        //   return <Chart />;
        // }}
        options={{
          actionsColumnIndex: -1,
          paging: true,
          pageSizeOptions: [2, 5, 10, 15, 20],
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: true, filtering: true,
          maxBodyHeight: 400,
        }}
        // components={{
        //   Toolbar: (props) => (
        //     <div>
        //       <MTableToolbar {...props} />
        //       <div className="toggle-switch">
        //         <Checkbox
        //           toggle
        //           onClick={() => toggleselected(!selected)}
        //           checked={selected}
        //           label="Show Archived"
        //         />
        //       </div>
        //     </div>
        //   ),
        // }}
        icons={{
          Export: () => <img src={Export}></img>,
          // Edit: () => <CreateIcon color="action" />,
          // Delete: () => <DeleteIcon color="action" />
        }}
      />
    </div>
  );
}


