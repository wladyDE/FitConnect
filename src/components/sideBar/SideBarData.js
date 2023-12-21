import ChatIcon from '@mui/icons-material/Chat';
import { FaPeopleGroup } from "react-icons/fa6";
import SettingsIcon from '@mui/icons-material/Settings';
import { FaGlobe } from "react-icons/fa";

const SideBarData = [
    {
        title: "Map",
        icon: <FaGlobe style={{fontSize : '24px'}}/>,
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