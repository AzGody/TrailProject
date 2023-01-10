import './index.css'
import Header from "../Header";
import Footer from "../footer";

const Details = () => {
    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg"
                    namePage="Trail en montagne à Saint-Étienne-de-Baïgorry"
                    description="25 km"
            />
            <div className="details">
                <div className="container">
                    <div className="header">
                        <div className="title font-dancing-script">
                            Trail en montagne à Saint-Étienne-de-Baïgorry
                        </div>
                        <div className="distance font-dancing-script">
                            25 km
                        </div>
                    </div>
                    <div className="path">
                        <div className="start">
                            <img src="/src/assets/start.png" alt="Start"></img>
                            <div className="font-dancing-script">
                                Saint-Étienne-de-Baïgorry
                            </div>
                        </div>
                        <div className="flex-1 flex-column">
                            <img className="arrow-top" src="/src/assets/arrow.png" alt="positive elevation"></img>
                            <div className="elevation font-dancing-script">
                                <div className="elevation font-dancing-script">
                                    +200m
                                </div>
                            </div>
                            <div className="trace">
                                <div className="circle"></div>
                                <div className="line flex-1"></div>
                                <div className="circle"></div>
                            </div>
                            <div className="elevation font-dancing-script">
                                -130m
                            </div>
                            <img className="arrow-bottom" src="/src/assets/arrow.png" alt="nagative elevation"></img>
                        </div>
                        <div className="arrival">
                            <img src="/src/assets/arrival.png" alt="Start"></img>
                            <div className="font-dancing-script">
                                Saint-Étienne-de-Baïgorry
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <div className="title font-dancing-script">
                            Description
                        </div>
                        <div className="content">
                            Le trail en montagne à Saint-Étienne-de-Baïgorry est une course à pied en nature qui se
                            déroule sur des sentiers et chemins de montagne. Ce parcours de montagne offre de
                            magnifiques panoramas sur les paysages environnants. Vous pourrez découvrir la région et ses
                            richesses naturelles tout en vous dépassant physiquement. Le trail en montagne est une
                            activité idéale pour les amateurs de plein air et de grands espaces. Si vous cherchez un
                            défi physique et un moment de détente en pleine nature, le trail en montagne à
                            Saint-Étienne-de-Baïgorry est fait pour vous.
                        </div>
<<<<<<< HEAD
                    </div>
                </div>
                <div className="description">
                    <div className="title font-dancing-script">
                        Description
                    </div>
                    <div className="text">
                        Le trail en montagne à Saint-Étienne-de-Baïgorry est une course à pied en nature qui se déroule sur des sentiers et chemins de montagne. Ce parcours de montagne offre de magnifiques panoramas sur les paysages environnants. Vous pourrez découvrir la région et ses richesses naturelles tout en vous dépassant physiquement. Le trail en montagne est une activité idéale pour les amateurs de plein air et de grands espaces. Si vous cherchez un défi physique et un moment de détente en pleine nature, le trail en montagne à Saint-Étienne-de-Baïgorry est fait pour vous.
=======
>>>>>>> 8afa56e62b346f564a341b769a884fc0e2fa181c
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Details
