import './index.css'
import facebook from '../../../assets/facebook.png'
import twitter from '../../../assets/instagram.png'
import instagram from '../../../assets/twitter.png'

const Navbar = () => {
    return (
        <div className='admin-navbar-container'>
            <nav id="admin-navbar">
                <ul>
                    <li><a href="/admin/evenements">Evenement</a></li>
                    <li><a href="/admin/courses">Courses</a></li>
                    <li><a href="/admin/utilisateurs">Utilisateurs</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar