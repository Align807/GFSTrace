import React, { useState } from 'react';


import FarmTable from './farmTable';
import Farmpopup from './FarmListPopup/farmpopup';
import '../../Pages.css';
import axios from "axios";
import { useEffect } from "react";
//import farm from "../../../../Data/farmData";


import { Grid } from 'semantic-ui-react';
//import _ from 'lodash';




export default function Farms() {

  const [selectFarm, setselectFarm] = useState(-1);
  const [farm, setfarm] = useState([]);
  const [check, setcheck] = React.useState();
  let Userdata = JSON.parse(localStorage.getItem('User'));
  const [db, setDb] = React.useState(Userdata);

  let options = null;

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
      setselectFarm(response.data[0].farmid);
      console.log(response.data)
    }
    else {
      setselectFarm(-1);
    }
  }
  useEffect(() => {
   // getfarms();

  }, [check]);

  function FarmDropdown() {


    options = farm.map((el) => <option value={el.farmid}>{el.farm_name}</option>
    );

    if (selectFarm === -1) {
      return (<>

        <div class="inputfield">
          <div class="custom_select">
            <select >
              <option>No data available</option>
            </select>
          </div>
        </div>
      </>
      )
    }
    else {
      return (<>

        <div class="inputfield">
          <div class="custom_select">
            <select value={selectFarm} onChange={(e) => { setselectFarm(e.target.value); }}>
              {options}
            </select>
          </div>
        </div>
      </>
      )
    }



  }




  return (

    <div className="table-size">

      <div className="subheader">

        <h1 style={{ "color": "black" }}>Farms </h1><span>&nbsp;&nbsp;</span>


        {/*--------------------------------------------Add edit delete farm popup----------------------*/}
        <div className="icon-align">

          <Farmpopup Value={selectFarm} />
        </div>
        <Grid.Column style={{ "margin-left": "10px" }}>
          <FarmDropdown />
        </Grid.Column>
        <div className="spacer"></div>

      </div>
      {/*------------------------------------Farm Tables Paddock, silos, fuel tanks----------------------*/}
      <FarmTable Value={selectFarm} />
    </div>

  );
}
