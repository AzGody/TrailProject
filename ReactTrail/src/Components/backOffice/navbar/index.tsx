import './index.css'
import facebook from '../../../assets/facebook.png'
import twitter from '../../../assets/instagram.png'
import instagram from '../../../assets/twitter.png'

const Navbar = () => {
    return (
        <div className='admin-navbar-container'>
            <nav id="admin-navbar">
                <ul>
                    <li><a href="/admin/evenements" className='px-3'>Evenement</a></li>
                    <li><a href="/admin/courses" className='px-3'>Courses</a></li>
                    <li><a href="/admin/utilisateurs" className='px-3'>Utilisateurs</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar