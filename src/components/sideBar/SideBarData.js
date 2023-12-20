import ChatIcon from '@mui/icons-material/Chat';
import { FaPeopleGroup } from "react-icons/fa6";
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';

const SideBarData = [
    {
        title: "Map",
        icon: <MapIcon />,
        link: "/"
    },
    {
        title: "Chat",
        icon: <ChatIcon />,
        link: "/chat"
    },
    {
        title: "My Trainings",
        icon: <FaPeopleGroup style={{fontSize : '24px'}}/>,
        link: "/my-trainings"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/settings"
    }
]
 
export default SideBarData;