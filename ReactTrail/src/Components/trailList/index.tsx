import './index.css'
import {list} from "postcss";

const List = () => {
    return (
        <div className='list'>
            <div className="container">


                <a href={"/details"}>
                    <div className="card">
                        <div className="card-header">
                            <img src="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg" alt="rover" />
                        </div>
                        <div className="card-body">
                            <h4>
                                Dimanche 25 Février
                            </h4>
                            <h3>
                                Trail du vieux Lac
                            </h3>
                            <p>
                                Course à pied en nature, sur sentiers et chemins de montagne. Dépassez vos limites et admirez la beauté de la nature.
                            </p>
                            <div className="flex">
                                <div className="user">
                                    <img src="https://img1.freepng.fr/20180714/ggq/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f1ef441.4301202215315676631268.jpg" alt="user" />
                                    <div className="user-info">
                                        <h5>Bastien Oswald</h5>
                                        <small>2h ago</small>
                                    </div>
                                </div>
                                <div className='distance'>25 km</div>
                            </div>
                        </div>
                    </div>
                </a>

                <a href={"/details"}>
                    <div className="card">
                        <div className="card-header">
                            <img src="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg" alt="rover" />
                        </div>
                        <div className="card-body">
                            <h4>
                                Dimanche 25 Février
                            </h4>
                            <h3>
                                Trail du vieux Lac
                            </h3>
                            <p>
                                Course à pied en nature, sur sentiers et chemins de montagne. Dépassez vos limites et admirez la beauté de la nature.
                            </p>
                            <div className="flex">
                                <div className="user">
                                    <img src="https://img1.freepng.fr/20180714/ggq/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f1ef441.4301202215315676631268.jpg" alt="user" />
                                    <div className="user-info">
                                        <h5>Bastien Oswald</h5>
                                        <small>2h ago</small>
                                    </div>
                                </div>
                                <div className='distance'>25 km</div>
                            </div>
                        </div>
                    </div>
                </a>

            </div>
        </div>
    )
}

export default List