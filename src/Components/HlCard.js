import { Link } from 'react-router-dom';
import bikeIcon from '../Img/bike.svg';
import '../Css/HlCard.css';

const HlCard = ({ photo, title, price, description }) => {
    console.log("photo",photo)
    return(
        <article className="Hl-card-container">
            <img className="Hl-card-photo" src={ photo} alt='text photo'/>
            <h1 className="Hl-card-title">{title}</h1>
            <h1 className="Hl-card-price">${price}</h1>
            <p className="Hl-card-text">{description}</p>
            <Link to="/delivery" className="Hl-card-link">
                <div className="Hl-card-foot">
                    <h2 className="Hl-card-foot1">Order a delivery</h2>
                    <img className="Hl-card-bike" src={bikeIcon} alt='delivery icon' />
                </div>
            </Link>
        </article>
    )
}
export default HlCard