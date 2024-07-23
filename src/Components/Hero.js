import Button from './Button';
import { useNavigate } from 'react-router-dom';
import Food from '../Img/food.jpg';
import '../Css/hero.css';

const Hero = () => {
    const navigate = useNavigate(); 

    const handleReserveTableClick = () => {
        console.log('Reserve a Table button clicked');
        navigate('/reservations'); // Navega a /reservations
    };

    return(
        <>
            <section className='Hero-container'>
                <div className='Hero-Title'>
                    <article>
                        <h1 className='Hero-Lemon'>Little Lemon</h1>
                        <h3 className='Hero-Chicago'>Chicago</h3>
                    </article>
                </div>
                <div className='Hero-Paragraph'>
                    <p>
                        We are a family owned
                        Mediterranean restaurant,
                        focused on traditional
                        recipes served with a modern
                        twist
                    </p>
                </div>
                <Button className="App-button Hero-button" onClick={handleReserveTableClick}>Reserve a Table</Button>
                <picture className='Hero-photo'>
                    <img src={Food}></img>
                </picture>
            </section>
        </>
    )
}
export default Hero;