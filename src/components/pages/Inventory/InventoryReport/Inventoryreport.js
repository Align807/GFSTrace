import React from "react";
import "../../Pages.css";
import { FaFilter } from "react-icons/fa";
import GearIcon from "mdi-react/GearIcon";

export default function Inventoryreport() {
  return (
    <div className="table-size">
      <div className="subheader">
        <h1 style={{ color: "black" }}>Inventory Reports </h1>
        <span>&nbsp;&nbsp;</span>
        <div className="icon-align">
          <GearIcon
            style={{ cursor: "pointer", color: "black" }}
            onClick={console.log("modal opened")}
          ></GearIcon>
        </div>
      </div>
    </div>
  );
}
