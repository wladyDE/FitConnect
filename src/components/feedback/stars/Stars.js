import './stars.scss'; 

const Star = ({styles}) => {
    return <span className='rating-star' style={styles}>&#9733;</span>;
};

const Stars = ({ stars, fontSize, styles }) => {
    styles = {
        ...styles,
        fontSize
    }

    const starsArray = [];
    for (let i = 0; i < stars; i++) {
        starsArray.push(<Star key={i}  styles={styles} />);
    }

    return <div className="rating-stars">{starsArray}</div>;
}

export default Stars

