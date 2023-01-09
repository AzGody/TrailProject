import './style.css'
import formBg from '../../assets/courses-form-bg.jpg'

const Courses = () => {
  return (
    <div className='form-container h-screen flex flex-col items-center justify-center'>
      <h1 className="text-3xl font-bold underline text-center mb-8">
        Créer une course
      </h1>
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="w-1/3 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between ">
            <div className="flex flex-col items-start justify-center w-48">
              <label htmlFor="course-nom">Nom</label>
              <input
                type="text"
                id="course-nom"
                name="course-nom"
                placeholder="Entrez le nom de la course"
                className="border-black rounded-lg border-solid border p-2 h-10"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-48">
              <label htmlFor="course-date">Date</label>
              <input
                type="date"
                id="course-date"
                name="course-date"
                className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full mt-4">
            <label htmlFor="course-distance">Distance</label>
            <input
              type="number"
              id="course-distance"
              name="course-distance"
              placeholder="Entrez la distance de la course en km"
              className="border-black rounded-lg border-solid border p-2 w-full"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col items-start justify-center  w-48">
              <label htmlFor="course-denivele-max">Dénivelé maximum</label>
              <input
                type="number"
                id="course-denivele-max"
                name="course-denivele-max"
                placeholder="Dénivelé maximum en m"
                className="border-black rounded-lg border-solid border p-2"
              />
            </div>
            <div className="flex flex-col items-start justify-center  w-48">
              <label htmlFor="course-denivele-min">Dénivelé minimum</label>
              <input
                type="number"
                id="course-denivele-min"
                name="course-denivele-min"
                placeholder="Dénivelé minimum en m"
                className="border-black rounded-lg border-solid border p-2"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Créer"
            className="mt-4 mr-4 bg-slate-500 rounded-lg p-2 text-white w-24"
          />
          <input
            type="button"
            value="Annuler"
            className="mt-4 bg-red-400 rounded-lg p-2 text-white w-24"
          />
        </form>
      </div>
      <img  alt="" />
    </div>
  )
}

export default Courses
