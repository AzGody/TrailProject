// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import BOList from '../../../Components/backOffice/trailList';


const BackOfficeCourses = () => {
    return (
        <>
            <Header backgroundImage="/course.png"
                    namePage="Liste des courses"
                    description="Liste de tous les courses créés"
            />
            <div className={"container mx-auto py-28"}>
                <Navbar/>
                <BOList/>
            </div>
            <Footer></Footer>

        </>
    )
}

export default BackOfficeCourses