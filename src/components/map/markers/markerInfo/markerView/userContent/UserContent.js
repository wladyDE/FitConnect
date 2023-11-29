import { useEffect, useState, useContext } from 'react';
import { getUserInfo, followUser, unFollowUser } from '../../../../../../service/SocialService';
import Spinner from '../../../../../spinner/Spinner';
import backImg from '../../../../../../ressources/img/back.png';
import { AuthContext } from '../../../../../../context/AuthContext';
import './userContent.scss';
import { animateNumber } from '../../../../../../utils/animation'

const UserContent = ({ view: userId, setView }) => {
    const [user, setUser] = useState(null);
    const [social, setSocial] = useState('nothing');
    const { currentUser } = useContext(AuthContext);

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

    useEffect(() => {
        if (currentUser.uid === userId) {
            setSocial('nothing');
            return;
        }
        
        if (user) {
            const { followers } = user;
            if (followers) {
                const isFollowing = followers.some(user => user === currentUser.uid);
                if (isFollowing) {
                    setSocial('unfollow');
                } else {
                    setSocial('follow');
                }
            } else {
                setSocial('follow');
            }
        }
    }, [user]);

    const backToTheMarker = (e) => {
        e.stopPropagation();
        setView('content');
    }

    const onFollow = (userId, currentUserId) => {
        followUser(userId, currentUserId);
        setSocial('unfollow');
    }

    const onUnFollow = (userId, currentUserId) => {
        unFollowUser(userId, currentUserId);
        setSocial('follow');
    }

    const getSocial = () => {
        switch (social) {
            case 'follow':
                return <button className='follow follow-btn' onClick={() => onFollow(userId, currentUser.uid)}>Follow</button>
            case 'unfollow':
                return <button className='follow unfollow-btn' onClick={() => onUnFollow(userId, currentUser.uid)}>Unfollow</button>
            default:
                return null;
        }
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
                    <div className="marker__user-main">
                        <div className="marker__user-title">{user.displayName}</div>
                        {getSocial()}
                    </div>
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