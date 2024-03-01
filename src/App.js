import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation, I18nextProvider } from 'react-i18next';
import Structure from "./components/Layout/Structure";
//import Dashboard from "./components/pages/Dashboard/Dashboard";
import Job from "./components/pages/Job/job";
import Signin from "./components/pages/Login/SignIn";
import Equipments from "./components/pages/FarmAssets/Equipments/Equipments";
import Farms from "./components/pages/FarmAssets/Farms/farms";
import Chemicals from "./components/pages/FarmAssets/Chemicals/Chemical";
import Users from "./components/pages/FarmAssets/Users/Users";
import Fertiliser from "./components/pages/FarmAssets/Fertiliser/FertiliserTable";
import Livestock from "./components/pages/FarmAssets/Livestock/LiveStock";
import Cultivars from "./components/pages/FarmAssets/Cultivars/Cultivars";
import WaterLicence from "./components/pages/FarmAssets/WaterLicence/WaterLicence";
import Nozzles from "./components/pages/FarmAssets/Nozzles/Nozzles";
import InventoryChemical from "./components/pages/Inventory/InventoryChemical/InventoryChemical";
import Grain from "./components/pages/Inventory/GrainInventory/GrainsTable";
import Spraylogs from "./components/pages/Activities/Spraylogs/Spraylogs";
import Planting from "./components/pages/Activities/Planting/Planting";
import Spreading from "./components/pages/Activities/Spreading/Spreading";
import Harvest from "./components/pages/Activities/Harvest/Harvest";
import Grazing from "./components/pages/Activities/Grazing/Grazing";
import Irrigation from "./components/pages/Activities/Irrigation/Irrigation";
import Maintenance from "./components/pages/Activities/Maintenance/Maintenance";
import VetTreatment from "./components/pages/Activities/VetTreatment/VetTreatment";
import InventoryWater from "./components/pages/Inventory/Water/InventoryWater";  
import Custom from "./components/pages/CustomReport/Custom"; 
import InventoryFuel from "./components/pages/Inventory/FuelInventory/FuelTable";
import InventoryFertilizer from "./components/pages/Inventory/FertilizerInventory/InventoryFertilizer";
import Inventoryreport from "./components/pages/Inventory/InventoryReport/Inventoryreport";
import Forget from "./components/pages/Login/Forget";
import SignUp from "./components/pages/Login/SignUp";
function App (){
  const {i18n}=useTranslation();
  
    return (
      <I18nextProvider i18n={i18n}>
      <Router >
        <Structure>
          <Routes>
            {/* <Route path="/" element={<Dashboard/>}/> */}
            <Route path="/Login" element={<Signin/>}/>
            <Route path="/Jobs" element={<Job/>}/>
            <Route path="/Equipments" element={<Equipments/>}/>
            <Route path="/Farms" element={<Farms/>}/>
            <Route path="/Chemicals" element={<Chemicals/>}/>
            <Route path="/Users" element={<Users/>}/>
            <Route path="/Fertiliser" element={<Fertiliser/>}/>
            <Route path="/Nozzles" element={<Nozzles/>}/>
            <Route path="/Livestock" element={<Livestock/>}/>
            <Route path="/Forget" element={<Forget/>}/>
            <Route path='/Signup' element={<SignUp/>}/>
            <Route path="/WaterLicence" element={<WaterLicence/>}/>
            <Route path="/InventoryChemical" element={<InventoryChemical/>}/>
            <Route path="/InventoryFertilizer" element={<InventoryFertilizer/>}/>
            <Route path="/InventoryFuel" element={<InventoryFuel/>}/>
            <Route path="/Spraylogs" element={<Spraylogs/>}/>
            <Route path="/Planting" element={<Planting/>}/>
            <Route path="/Spreading" element={<Spreading/>}/>
            <Route path="/Harvest" element={<Harvest/>}/>
            <Route path="/Grazing" element={<Grazing/>}/>
            <Route path="/InventoryWater" element={<InventoryWater/>}/>
            <Route path="/Irrigation" element={<Irrigation/>}/>
            <Route path="/Maintenance" element={<Maintenance/>}/>
            <Route path="/VetTreatment" element={<VetTreatment/>}/>
            <Route path="/Custom" element={<Custom/>}/>
            <Route path="/Cultivars" element={<Cultivars/>}/>
            <Route path="/InventoryReport" element={<Inventoryreport/>}/>
            <Route path="/Grain" element={<Grain/>}/>
           
          </Routes>
          
               
         </Structure>
      </Router>
      </I18nextProvider>
    );
  
}

export default App;
