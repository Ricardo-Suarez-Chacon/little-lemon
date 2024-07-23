// testimonials.js 

import TestimonialCard from "./TestimonialCard";
import '../Css/Testimonials.css';
import testimonialsData from '../Api_response/Testimonials.json';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
const Testimonials = () => {
    return(
        <>
            <section className='Testimonial-container'>
                <article className='Testimonial-container-head'>
                    <h2 >Testimonials</h2>
                </article>
                <div className="carousel-container">
                    <Carousel responsive={responsive} showDots={true}>
                        {testimonialsData.map((testimonial, index) => (
                            <div key={index} className="carousel-card">
                            <TestimonialCard
                                photo={testimonial.photo}
                                text1={testimonial.text1}
                                name={testimonial.name}
                                text2={testimonial.text2}
                                rating={testimonial.rating}
                            />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>
        </>
    )
}
export default Testimonials