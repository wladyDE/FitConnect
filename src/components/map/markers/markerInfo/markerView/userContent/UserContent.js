import { useEffect, useState, useContext } from 'react';
import { followUser, unFollowUser } from '../../../../../../service/SocialService';
import { saveFollowRequest, removeFollowRequest } from '../../../../../../service/RequestService';
import { getUser } from '../../../../../../service/UserService';
import Spinner from '../../../../../spinner/Spinner';
import { getFeedback } from '../../../../../../service/FeedbackService';
import backImg from '../../../../../../ressources/img/back.png';
import { AuthContext } from '../../../../../../context/AuthContext';
import './userContent.scss';
import UserFeedbackTitle from './UserFeedbackTitle';

const UserContent = ({ view: userId, setView, setUserView}) => {
    const [user, setUser] = useState(null);
    const [social, setSocial] = useState('nothing');
    const { currentUser } = useContext(AuthContext);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const [userData, userFeedback] = await Promise.all([
                getUser(userId),
                getFeedback(userId)
            ]);

            setUser(userData);
            if(userFeedback?.stars != 0){
                setFeedback(userFeedback)
            }

            setUserView(userId)
        };

        fetchUserData();
    }, []);


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
        saveFollowRequest(userId, currentUserId)
    }

    const onUnFollow = (userId, currentUserId) => {
        unFollowUser(userId, currentUserId);
        setSocial('follow');
        removeFollowRequest(userId, currentUserId)
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


    const showFeedback = () => {
        if(feedback){
            return <UserFeedbackTitle setView={setView} userFeedback={feedback}/>
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
                        {showFeedback()}
                    </div>
                    <div className="marker__user-statistik">
                        <div className="marker__user-social">
                            <span id='marker__user-trainings'>3</span>
                            <p> Trainings</p>
                        </div>
                        <div className="marker__user-social">
                            <span id='marker__user-followers'>{user.followers?.length ?? 0}</span>
                            <p> Followers</p>
                        </div>
                        <div className="marker__user-social">
                            <span id='marker__user-following'>{user.following?.length ?? 0}</span>
                            <p> Following</p>
                        </div>
                    </div>
                    <div className="marker__user-description">{user.description}</div>
                    {getSocial()}
                </div>
            </div>
        </>
    )
}

export default UserContent