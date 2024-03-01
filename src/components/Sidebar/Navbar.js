import { React } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { MdSpaceDashboard } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { GoProject } from "react-icons/go";
import {
  FaWarehouse,
  FaUserClock,
  FaCalendarAlt,
  FaTasks,
  FaHandHoldingWater,
  FaTools,
  FaUsers,
  FaSprayCan,
} from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { ImDroplet } from "react-icons/im";
import "./sidebar.css";
import { SiHappycow } from "react-icons/si";
import { MdVerified } from "react-icons/md";
import { GiMedicalPackAlt } from "react-icons/gi";
import { BsFillCloudLightningRainFill } from "react-icons/bs";
import {
  GiFarmTractor,
  GiGroundSprout,
  GiPlantWatering,
  GiFruitTree,
  GiAutoRepair,
  GiWheat,
  GiChemicalDrop,
  GiGrain,
  GiFuelTank,
  GiFertilizerBag,
  GiField,
  GiGoat,
  GiGrainBundle,
} from "react-icons/gi";
const { SubMenu } = Menu;
export default function Navbar(props) {
  return (
    <div className="side-menu">
      <div className="logo">
        {!props.compact && <div className="Cname">GFS Trace</div>}
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="vertical">
        {/* <Menu.Item key="1" icon={<MdSpaceDashboard />}>
          <Link to="/" />
          <Trans i18nKey="navbar.dashboard">Dashboard</Trans>
        </Menu.Item> */}
        <SubMenu key="sub1" icon={<GiFarmTractor />} title={<Trans i18nKey="navbar.farmassets">
            Farm Assets
            </Trans>}>
          <Menu.Item key="1" icon={<GiField />}>
            <Link to="/Farms" />
            <Trans i18nKey="navbar.farms">
            Farms
            </Trans>
          </Menu.Item>
          {/* <Menu.Item key="21" icon={<BsFillCloudLightningRainFill />}>
          <Trans i18nKey="navbar.rain">
            Rain
            </Trans>
          </Menu.Item> */}
          <Menu.Item key="2" icon={<GiGrainBundle />}>
            <Link to="/Cultivars" />
            <Trans i18nKey="navbar.cultivars">
           Cultivars
            </Trans>
          </Menu.Item>
          <Menu.Item key="3" icon={<GiGoat />}>
            <Link to="/Livestock" />
            <Trans i18nKey="navbar.livestock">
            Livestock
            </Trans>
          </Menu.Item>
          <Menu.Item key="4" icon={<FaTools />}>
            <Link to="/Equipments" />
            <Trans i18nKey="navbar.equipments">
            Equipments
            </Trans>
          </Menu.Item>
          <Menu.Item key="5" icon={<GiChemicalDrop />}>
            <Link to="/Chemicals" />
            <Trans i18nKey="navbar.chemicals">
            Chemicals
            </Trans>
          </Menu.Item>
          <Menu.Item key="6" icon={<GiFertilizerBag />}>
            <Link to="/Fertiliser" />
            <Trans i18nKey="navbar.fertilizers">
            Fertilizers
            </Trans>
          </Menu.Item>
          <Menu.Item key="7" icon={<FaUsers />}>
            <Link to="/Users" />
            <Trans i18nKey="navbar.users">
            Users
            </Trans>
          </Menu.Item>
          <Menu.Item key="8" icon={<FaSprayCan />}>
            <Link to="/Nozzles" />
            <Trans i18nKey="navbar.nozzles">
            Nozzles
            </Trans>
          </Menu.Item>
          <Menu.Item key="9" icon={<MdVerified />}>
            <Link to="/Waterlicence" />
            <Trans i18nKey="navbar.water_licences">
            Water Licenses
            </Trans>
          </Menu.Item>
        </SubMenu>
        
        <Menu.Item key="10" icon={<GoProject />}>
          <Link to="/Jobs" />
          <Trans i18nKey="navbar.jobs">Jobs</Trans>
        </Menu.Item>
        <SubMenu
          key="sub2"
          icon={<FaTasks />}
          title={<Trans i18nKey="navbar.activities">Activities</Trans>}
        >
          {/* <Menu.Item key="4" icon={<VscOpenPreview />}>
            <Trans i18nKey="navbar.activity_reports">Activity Reports</Trans>
          </Menu.Item> */}
          <Menu.Item key="11" icon={<ImDroplet />}>
          <Link to="/Spraylogs" />
            <Trans i18nKey="navbar.spray_logs">Spray Logs</Trans>
          </Menu.Item>
          <Menu.Item key="12" icon={<GiGroundSprout />}>
          <Link to="/Planting" />
          <Trans i18nKey="navbar.planting">
            Planting
            </Trans>
          </Menu.Item>
          <Menu.Item key="13" icon={<GiWheat />}>
          <Link to="/Spreading" />
          <Trans i18nKey="navbar.spreading">
            Spreading
            </Trans>
          </Menu.Item>
          <Menu.Item key="14" icon={<GiFruitTree />}>
          <Link to="/Harvest" />
          <Trans i18nKey="navbar.harvest">
           Harvest
            </Trans>
          </Menu.Item>
          <Menu.Item key="15" icon={<GiAutoRepair />}>
          <Link to="/Maintenance" />
          <Trans i18nKey="navbar.maintainance">
            Maintenance
            </Trans>
          </Menu.Item>
          <Menu.Item key="16" icon={<GiPlantWatering />}>
          <Link to="/Irrigation" />
          <Trans i18nKey="navbar.irrigation">
            Irrigation
            </Trans>
          </Menu.Item>
          <Menu.Item key="17" icon={<SiHappycow />}>
          <Link to="/Grazing" />
          <Trans i18nKey="navbar.grazing">
            Grazing
            </Trans>
          </Menu.Item>
          <Menu.Item key="18" icon={<GiMedicalPackAlt />}>
          <Link to="/VetTreatment" />
          <Trans i18nKey="navbar.vettreatment">
            Vet Treatments
            </Trans>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<FaWarehouse />} title={<Trans i18nKey="navbar.inventory">
            Inventory
            </Trans>}>
          {/* <Menu.Item key="13" icon={<VscOpenPreview />}>
            <Link to="InventoryReport"/>
          <Trans i18nKey="navbar.inventory_reports">
            Inventory Reports
            </Trans>
          </Menu.Item> */}
          <Menu.Item key="19" icon={<GiGrain />}>
         <Link to="/Grain" />
          <Trans i18nKey="navbar.grain">
            Grain
            </Trans>
          </Menu.Item>
          <Menu.Item key="20" icon={<GiChemicalDrop />}>
            <Link to="/InventoryChemical" />
            <Trans i18nKey="navbar.chemical">
            Chemical
            </Trans>
          </Menu.Item>
          <Menu.Item key="21" icon={<GiFertilizerBag />}>
          <Link to="/InventoryFertilizer" />
          <Trans i18nKey="navbar.fertilizer">
            Fertilizer
            </Trans>
          </Menu.Item>
          <Menu.Item key="22" icon={<GiFuelTank />}>
          <Link to="/InventoryFuel" />
          <Trans i18nKey="navbar.fuel">
            Fuel
            </Trans>
          </Menu.Item>
          <Menu.Item key="23" icon={<FaHandHoldingWater />}>
          <Link to="/InventoryWater" />
          <Trans i18nKey="navbar.water">
            Water
            </Trans>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="24" icon={<VscOpenPreview />}>
          <Trans i18nKey="navbar.custom_reports">Custom Reports</Trans>
          <Link to="/Custom" />
        </Menu.Item>
        {/* <SubMenu key="sub3" icon={<BsPeopleFill />} title={<Trans i18nKey="navbar.personnel">
            Personnel
            </Trans>}>
          <Menu.Item key="19" icon={<FaUserClock />}>
          <Trans i18nKey="navbar.timesheet">
            Timesheet
            </Trans>
          </Menu.Item>
        </SubMenu>
        
        <Menu.Item key="30" icon={<FaCalendarAlt />}>
        <Trans i18nKey="navbar.calender">
            Calendar
            </Trans>
        </Menu.Item> */}
      </Menu>
    </div>
  );
}
