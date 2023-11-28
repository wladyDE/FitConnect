import { useEffect, useState } from 'react';
import { getUserInfo } from '../../../../../../service/SocialService';
import Spinner from '../../../../../spinner/Spinner';
import backImg from '../../../../../../ressources/img/back.png';
import './userContent.scss';
import { animateNumber } from '../../../../../../utils/animation'

const UserContent = ({ view: userId, setView }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserInfo(userId);
            setUser(userData);
        };

        fetchUserData();
    }, []);


    useEffect(() => {
        if (user) {
            animateNumber(16, 'marker__user-trainings');
            animateNumber(user.followers || 0, 'marker__user-followers');
            animateNumber(user.following || 0, 'marker__user-following');
        }
    }, [user]);

    const backToTheMarker = (e) => {
        e.stopPropagation();
        setView('content');
    }

    if (!user) {
        return <div className="spinner-container"><Spinner /></div>;
    }

    return (
        <>
            <img src={backImg} className="marker__user-back-btn" onClick={(e) => backToTheMarker(e)} alt='back' />
            <div className='marker__user'>
                <img src={user.photoURL} className='marker__user-img' alt="user-photo" />
                <div className="marker__user-content">
                    <div className="marker__user-title">{user.displayName}</div>
                    <div className="marker__user-statistik">
                        <div className="marker__user-social">
                            <span id='marker__user-trainings'></span>
                            <p> Trainings</p>
                        </div>
                        <div className="marker__user-social">
                            <span id='marker__user-followers'></span>
                            <p> Followers</p>
                        </div>
                        <div className="marker__user-social">
                            <span id='marker__user-following'></span>
                            <p> Following</p>
                        </div>
                    </div>
                    <div className="marker__user-description">{user.description}</div>
                </div>
            </div>
        </>
    )
}

export default UserContent