// Highlights.js 

import HlCard from "./HlCard";
import '../Css/Highlights.css';
import highlightsData from '../Api_response/HlCard.json';
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

const Highlights = () => {
    console.log("highlightsData", highlightsData)
    return(
        <>
            <section className='Hl-container'>
                <article className='Hl-container-head1'>
                    <h2>Highlights</h2>
                </article>
                <div className="carousel-container-ext">
                    <Carousel responsive={responsive} className="carousel-container" showDots={true}>
                        {highlightsData.map((highlight, index) => {
                            return (
                                <div key={index} className="carousel-card">
                                    <HlCard
                                        photo={highlight.photo}
                                        title={highlight.title}
                                        price={highlight.price}
                                        description={highlight.description}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </section>
        </>
    )
}
export default Highlights