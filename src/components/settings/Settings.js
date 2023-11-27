import 'firebase/auth';
import 'firebase/storage';
import UserPassword from "./userPassword/UserPassword";
import SignOut from './signOut/SignOut';
import UserProfile from './userProfile/UserProfile';
import { useState } from 'react';
import { AccordionItem } from '../accordionItem/AccordionItem';
import './settings.scss';

const accordionItems = [
    {
        name : 'Profile',
        content : <UserProfile />
    }, 
    {
        name : 'Change Password',
        content :  <UserPassword />
    }, 
    {
        name : 'SignOut',
        content :  <SignOut />
    }
]

const activeAccordionItems = [false, false, false]; 

const Settings = () => {
    const [activeItems, setActiveItems] = useState(activeAccordionItems);

    const onAccordionItemClick = (index) => {
        const newActiveItems = activeItems.map((item, i) => i === index ? !item : item);
        setActiveItems(newActiveItems);
    };

    return (
        <div className="settings">
            <h2 className="settings-title">Settings</h2>
            {accordionItems.map((item, index) => {
                return (
                    <AccordionItem
                        onClick={() => onAccordionItemClick(index)}
                        item={item}
                        isActive={activeItems[index]}
                        key={index}
                    />
                );
            })}
        </div>
    );
}

export default Settings;
