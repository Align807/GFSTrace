import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import Export from '../../../export.png';
import { chemicals_data } from '../../../../../Data/InventoryChemicalData';
import { Checkbox } from "semantic-ui-react";
import CreateIcon from '@mui/icons-material/Create';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect } from "react";
import './archived.css';
export default function Chemicals() {
    const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState([])
    const [check, setcheck] = React.useState();
    let Userdata = JSON.parse(localStorage.getItem('User'));
    const [db, setDb] = React.useState(Userdata);
  
    const getchemical = async () => {
      var json = {
        "paramObject": {
          "queryId": "FARMER_CHEMICALS",
          "paramArray": [db.data[0].user_id],
          "strCallerFunction": "DEMO DATA"
        }
      };
      var response = await axios.post('http://localhost:3002/chemicalsgenericselect', json)
      setcheck(1)
      if (response) {
        setData(response.data);
        console.log(response.data)
      }
    }
    useEffect(() => {
      getchemical();
    }, [check]);

    const columns = [{
        title: 'Name', field: 'chemical_name'
    },
    {
        title: 'Resistance Group', field: 'resistance_group',
    },
    {
        title: 'Actives', field: 'actives',
    }, {
        title: 'Amount', field: 'inventory',
    },
    {
      title: 'Unit', field: 'iunit',
      lookup: {
        '0': 'mL', '1': 'Kg', '2': 'L', '3': 'lb', '4': 'oz', '5': 'g',
        '6': 'floz', '7': 'qt', '8': 'pt', '9': 't'
      },
    }]
    const columns_archived = [{
      title: 'Name', field: 'chemical_name'
  },
  {
      title: 'Resistance Group', field: 'resistance_group',
  },
  {
      title: 'Actives', field: 'actives',
  }, {
      title: 'Amount', field: 'inventory',
  },
  {
    title: 'Unit', field: 'iunit',
    lookup: {
      '0': 'mL', '1': 'Kg', '2': 'L', '3': 'lb', '4': 'oz', '5': 'g',
      '6': 'floz', '7': 'qt', '8': 'pt', '9': 't'
    },
  },
    {
        title: "Archived",
        field: "archived",
      },]
    return (
        <div>
            <MaterialTable title="CHEMICALS"
                data={data}
                columns={selected ? columns_archived : columns}

                options={{
                  maxBodyHeight: 400,
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 15, 20],
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    filtering: true,
                    actionsColumnIndex:-1
                  }}
                components={{
                    Toolbar: props => (
                      <div>
                        <MTableToolbar {...props} />
                        <div className="toggle-switch">
                          <Checkbox
                            toggle
                            onClick={() => toggleselected(!selected)}
                            checked={selected}
                            label="Show Archived Chemicals"
                          />
                        </div>
                      </div>
                    ),
                  }}
                  icons={{
                    Add: () => <AddCircleRoundedIcon fontSize="large" color="primary" />,
                    Edit: () => <CreateIcon color="action" />,
                    Export: () => <img src={Export}></img>,
                    Delete: () => <DeleteIcon color="action" />
                   
                  }}
                
            />
        </div>
    )
}