import React, { useEffect, useState } from 'react';
import UserName from './userName/UserName';
import { animateNumber } from '../../../utils/animation'
import './userInfo.scss';
import UserDescription from './userDescription/UserDescription';

const UserInfo = () => {
    useEffect(() => {
        animateNumber(16, 'user-trainings');
        animateNumber(390, 'user-followers');
        animateNumber(616, 'user-following');
    }, []);

    return (
        <div className="user__info">
            <UserName />
            <div className="user__info-statistik">
                <p><span id='user-trainings'></span> Trainings</p>
                <p><span id='user-followers'></span> Followers</p>
                <p><span id='user-following'></span> Following</p>
            </div>
            <UserDescription/>
        </div>
    );
};

export default UserInfo