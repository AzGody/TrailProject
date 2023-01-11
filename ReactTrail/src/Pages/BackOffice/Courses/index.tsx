// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import BOList from '../../../Components/backOffice/trailList';



const BackOfficeCourses = () => {
    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/course.png"
                namePage="Liste des courses"
                description="Vous pouvez trouver ici la liste des courses Reactive Trail"
            />
            <Navbar/>
            <BOList/>
            <Footer></Footer>

        </div>
    )
}

export default BackOfficeCourses