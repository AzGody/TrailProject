// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import List from "../../Components/trailList"



const Courses = () => {
  const [inputs, setInputs] = useState({})

  const handleSubmit = (event: any) => {
    event.preventDefault()
    inputs.localisation = { lat: 45, lng: 6 } //TODO: supprimer
    inputs.utilisateurs = []
    inputs.distance = +inputs.distance
    inputs.denivelePositif = +inputs.denivelePositif
    inputs.deniveleNegatif = +inputs.deniveleNegatif
    //console.log(inputs)

    fetch('http://127.0.0.1:8000/api/courses', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)))
      .catch((error) => console.log(error))
  }

  const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/course.png"
                namePage="Créer une course"
                description="Saisissiez le formulaire pour créer une course :"
            />
            <div className='flex items-center justify-center w-full'>Voici la liste des courses disponibles
            <a href='/new-course'>
                <button type="button" class="justify-right text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none" href="http://127.0.0.1:5173/new-course">Créer une course</button>
            </a>
            </div>
            <List />
            <Footer></Footer>

        </div>
    )
}

export default Courses
