import defaultUserPhoto from '../../../../../../../ressources/img/user.png';
import './participantAvatars.scss'; 

const ParticipantAvatars = ({ participants, setView}) => {
    const onProfileFotoClick = (e, participant) => {
      e.stopPropagation();
      setView(participant.id)
    }

    return (
      <div className="info-people-imgs">
        {participants.slice(0, 10).map((participant, index) => {
          const src = participant.photoURL || defaultUserPhoto;
          return (
            <img 
              key={index} 
              alt={participant.displayName} 
              src={src} 
              title={participant.displayName} 
              className='info-people-img' 
              onClick={(e) => onProfileFotoClick(e, participant)}
            />
          );
        })}
      </div>
    );
  }

  export default ParticipantAvatars; 