import './index.css'
import IMG from '../../assets/REACTIVE.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/instagram.png'
import instagram from '../../assets/twitter.png'

const Footer = () => {
    return (

        <div className='footer'>
            <img src={IMG} className='logo'></img>
            <div className='title-footer'>Reactive Trail</div>
            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                <div className='socials'>
                    <img src={facebook} className='social'></img>
                    <img src={twitter} className='social'></img>
                    <img src={instagram} className='social'></img>
                </div>
            </a>
        </div>
    )
}

export default Footer