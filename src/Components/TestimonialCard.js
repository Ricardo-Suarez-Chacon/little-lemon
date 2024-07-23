// TestimonialCard.js
import Stars from './Stars'
import '../Css/TestimonialCard.css'

const TestimonialCard = (props) => {
    const { photo, text1, name, text2, rating } = props;

    return(
        <article className="Testimonial-card-container">
            <figure className='Testimonial-card-stars'>
                <Stars className='Testimonial-stars' rating={rating} />
                <p>rating {rating}</p> 
            </figure>
            <figure className="Testimonial-card-photo-container">
                <img className="Testimonial-card-photo" src={photo} alt={`${name} photo`}/>
            </figure>
            <blockquote className="Testimonial-card-text1">
                {text1}
            </blockquote>
            <h2 className="Testimonial-card-name">
                {name}
            </h2>
            <p className="Testimonial-card-text2">
                {text2}
            </p>
        </article>
    )
}

export default TestimonialCard