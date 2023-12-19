import './stars.scss'; 

const Star = ({fontSize}) => {
    return <span className='rating-star' style={{fontSize : fontSize}}>&#9733;</span>;
};

const Stars = ({ stars, fontSize }) => {
    const starsArray = [];
    for (let i = 0; i < stars; i++) {
        starsArray.push(<Star key={i}  fontSize={fontSize}/>);
    }

    return <div className="rating-stars">{starsArray}</div>;
}

export default Stars

