import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";
import TableDetails from "./Tabledetails";
import "./Fuel.css";

export default function FuelTable() {
  const [state, setState] = React.useState("FUELTANK");

  return (
    <div  className= "table-size">
    
    <div className= "subheader">  
   
        <h1 style={{"color": "black"}}>Fuel Inventory </h1><span>&nbsp;&nbsp;</span>
  
    </div>
    <div className="fuel">
      <Menu pointing>
        <Menu.Item
          name="FUELTANK"
          active={state === "FUELTANK"}
          color="green"
          onClick={() => setState("FUELTANK")}
        />
        <Menu.Item
          name="INGOING"
          active={state === "INGOING"}
          onClick={() => setState("INGOING")}
          color="green"
        />
        <Menu.Item
          name="OUTGOING"
          active={state === "OUTGOING"}
          onClick={() => setState("OUTGOING")}
          color="green"
        />
        <Menu.Item
          name="STOCKTAKE"
          active={state === "STOCKTAKE"}
          onClick={() => setState("STOCKTAKE")}
          color="green"
        />

        <Menu.Item
          name="TOTAL"
          active={state === "TOTAL"}
          onClick={() => setState("TOTAL")}
          color="green"
        />
      </Menu>
      <Segment attached="bottom">
        <TableDetails dataValue={state} />
      </Segment>
    </div>
    </div>
  );
}
