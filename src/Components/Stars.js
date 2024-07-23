import Star from '../Img/star.png';

const Stars = (props) => {
    const fullStars = Math.floor(props.rating);
    const partialStar = props.rating - fullStars;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

    return(
        <figure style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
            {[...Array(fullStars)].map((e, i) => <img key={i} className='Testimonial-stars' src={Star} alt="Quality stars" style={{width: '1em', height: '1em'}}/>)}
            {partialStar > 0 && 
    <div style={{position: 'relative', width: '1em', height: '1em'}}>
        <img className='Testimonial-stars' src={Star} alt="Quality star" style={{width: '1em', height: '1em'}}/>
        <div style={{position: 'absolute', top: 0, right: 0,height:'1em',  width: `${(1 - partialStar) * 100}%`, backgroundColor: 'rgba(237, 239, 238, 0.7)', zIndex: 1}}></div>
    </div>
}
            {[...Array(emptyStars)].map((e, i) => <img key={i} className='Testimonial-stars' src={Star} alt="Quality empty star" style={{width: '1em', height: '1em', opacity: 0.3}}/>)}
        </figure>
    )
}

export default Stars