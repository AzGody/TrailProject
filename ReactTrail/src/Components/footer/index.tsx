import './index.css'
import IMG from '../../assets/REACTIVE.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/instagram.png'
import instagram from '../../assets/twitter.png'

const Footer = () => {
    return (
        <div className='footer'>
            <a href={"/"} className={"max-h-[200px] max-w-[200px]"}>
                <img src={IMG} className='logo'></img>
            </a>

            <div className={"flex flex-col align-center text-center"}>
                <p className={"title-footer"}>Reactive Trail</p>
                <p className={"text-stone-50 italic"}>Site réalise par les devs de compet</p>
            </div>

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