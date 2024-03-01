import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table';
import { fertiliser_data } from './Tabledatas';
import { Checkbox } from "semantic-ui-react";
import axios from "axios";
import { useEffect } from "react";
import './archived.css';
export default function Fertilisers() {
    const [selected, toggleselected] = React.useState(false);
    const [data, setData] = React.useState([])
    const [check, setcheck] = React.useState();
    let Userdata = JSON.parse(localStorage.getItem('User'));
    const [db, setDb] = React.useState(Userdata);
  
    const getfertiliser = async () => {
        var json = {
            "paramObject": {
                "queryId": "FARMER_FERTILISERS",
                "paramArray": [db.data[0].user_id],
                "strCallerFunction": "DEMO DATA"
            }
        };
        var response = await axios.post('http://localhost:3002/fertilisergenericselect', json)
        setcheck(1)
        if (response) {
            setData(response.data);
            console.log(response.data)
        }
    }
    useEffect(() => {
        getfertiliser();
    }, [check]);
    const columns = [{
        title: 'Name', field: 'fertiliser_name'
    },
    {
        title: 'Form', field: 'fertiliser_form',
    },
    {
        title: 'Nutrients', field: 'nutrients_name',
    }, {
        title: 'Amount', field: 'fertiliser_inventory',
    }]
    const columns_archived = [{
        title: 'Name', field: 'fertiliser_name'
    },
    {
        title: 'Form', field: 'fertiliser_form',
    },
    {
        title: 'Nutrients', field: 'nutrients_name',
    }, {
        title: 'Amount', field: 'fertiliser_inventory',
    },
    {
        title: "Archived",
        field: "archived",
    },]
    return (
        <div>
            <MaterialTable title="FERTILISERS"
                data={data}
                columns={selected ? columns_archived : columns}

                options={{
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 15, 20],
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
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
                                    label="Show Archived Fertilisers"
                                />
                            </div>
                        </div>
                    ),
                }}
            />
        </div>
    )
}