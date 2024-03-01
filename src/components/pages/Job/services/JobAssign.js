import { orange } from "@material-ui/core/colors"
import Circle from "@mui/icons-material/Circle"
import CircleOutlined from "@mui/icons-material/CircleOutlined"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import WarningIcon from '@mui/icons-material/Warning';
import tractor from './tractor.png';
import fueltank from './fuel tank.png';
import paddock from './paddock.png';
import silo from './silo.png';
import livestock from './livestock.png'

export const getPriority= () => ([
    {id:'1', title:'Low',icon:<KeyboardArrowDownIcon/>},
    {id:'2', title:'Normal',icon:<KeyboardArrowUpIcon sx={{ color: "#0000CD" }}/>},
    {id:'3', title:'High',icon:<DoubleArrowIcon sx={{ color: "#ff0000" }}/>},
    {id:'4', title:'Safety',icon:<WarningIcon sx={{ color: orange[500] }}/>}
])

export const getStatus= () => ([
    {id:'1', title:'Raised', icon:<CircleOutlined sx={{ color: "#0000CD" }} />},
    {id:'2', title:'Raised and Assigned',icon:<Circle sx={{ color: "#0000CD" }} />},
    {id:'3', title:'In Progress',icon:<Circle sx={{ color: orange[500] }}  />},
    {id:'4', title:'On Hold',icon:<Circle sx={{ color: "#ff0000" }}  />},
    {id:'5', title:'Completed',icon:<Circle color="success" />}
])

export const getCategory= () => ([
    {id:'1', title:'Equipment',data:{'Equipment':['Equ1']},icon:tractor},
    {id:'2', title:'Paddock',data:{'Farm':['Farm1','Farm2'],'Paddock':['Pad1']},icon:paddock},
    {id:'3', title:'Fuel Tank',data:{'Farm':['Farm1'],'Fuel Tank':['Fuel1']},icon:fueltank},
    {id:'4', title:'Silo',data:{'Farm':['Farm1'],'Silo':['Silo1']},icon:silo},
    {id:'5', title:'Livestock',data:{'Livestock':['Livestock1']},icon:livestock}
])