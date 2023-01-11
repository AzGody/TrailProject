import Header from "../../Components/Header"
import Footer from "../../Components/footer"

import bg from '../../assets/404_bg.jpg'

export default function Page404(){
    return(
        <>
            <Header backgroundImage={bg}
                namePage="Page non trouvée - Erreur 404"
                description="Cette page n'existe pas..."
            />
            <Footer></Footer>
        </>
    )
}