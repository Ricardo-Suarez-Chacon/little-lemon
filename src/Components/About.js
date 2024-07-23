// About.js
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../Css/About.css';
import LL_1 from '../Img/LittleLemon_1.jpeg';
import LL_2 from '../Img/LittleLemon_2.jpeg';
import LL_3 from '../Img/LittleLemon_3.jpeg';
import LL_4 from '../Img/LittleLemon_4.jpeg';
import LL_5 from '../Img/LittleLemon_5.jpeg';
import FMY_1 from '../Img/family_1.jpeg';
import FMY_2 from '../Img/family_2.jpeg';
import FMY_3 from '../Img/family_3.jpeg';
import FMY_4 from '../Img/family_4.jpeg';
import FMY_5 from '../Img/family_5.jpeg';

const restaurantImages = [LL_5, LL_1, LL_2, LL_3, LL_4];
const historicImages = [FMY_1, FMY_2, FMY_3, FMY_4, FMY_5];
const staffImages = [];


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 0 },
        items: 1
    }
};

const About = () => {
    return (
        <section className="grid-container-about" >
            <article className="text-box-Rest">
                <h2 className="text-box-Little">Little Lemon, a Mediterranean gem in Chicago where family warmth meets urban sophistication. </h2>
            </article>
            <figure className="carousel_rest_img" data-testid='AboutCarrouselLeft'>
                <Carousel responsive={responsive} >
                    {restaurantImages.map((image, index) => (
                        <img className="carousel-image" key={index} src={image} alt="" />
                    ))}
                </Carousel>
            </figure>
            <article className="text-box-RDersc">

                <p>Our modern, art-adorned space offers exquisite Mediterranean cuisine, each dish a masterpiece celebrating rich culinary traditions. <br/> Welcome to Little Lemon, where Mediterranean spirit thrives in Chicago's urban landscape.</p>
            </article>
            <figure className="ImageFan-css" data-testid='AboutCarrouselRight'>
            <Carousel responsive={responsive} >
                    {historicImages.map((image, index) => (
                        <img className="carousel-image" key={index} src={image} alt="" />
                    ))}
                </Carousel>
            </figure>
            <article className="text-box-TextFml">
                <p>
                From Mediterranean shores to Chicago's bustling streets, our kitchen echoes with ancestral whispers, each recipe a tale of love and heritage. Join us in this culinary odyssey, where every bite is a dance of flavors, and every meal a celebration of family, tradition, and the essence of Little Lemon.
                </p>
                </article>
        </section>
    );
}

export default About;