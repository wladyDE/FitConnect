import { useEffect } from 'react';
import UserName from './userName/UserName';
import { animateNumber } from '../../../utils/animation'
import './userProfile.scss';
import UserDescription from './userDescription/UserDescription'
import UserPhoto from './userPhoto/UserPhoto'; 

const UserProfile = () => {
    useEffect(() => {
        animateNumber(16, 'user-trainings');
        animateNumber(390, 'user-followers');
        animateNumber(616, 'user-following');
    }, []);

    return (
        <div className="settings-profile">
            <UserPhoto />
            <div className="user__info">
                <UserName />
                <div className="user__info-statistik">
                    <p><span id='user-trainings'></span> Trainings</p>
                    <p><span id='user-followers'></span> Followers</p>
                    <p><span id='user-following'></span> Following</p>
                </div>
                <UserDescription />
            </div>
        </div>
    );
};

export default UserProfile