import Requirements from "../Components/Requirements";
import ConcentrationSelector from "../Components/ConcentrationSelector";
import NavBar from "../Components/NavBar";


function RequirementsHub(props) {

    

    return (
       
            <div className="requirements-hub-page">
                <NavBar/>
                <div className='container'>
                    <Requirements/>
                    <ConcentrationSelector/>
                </div>
            </div>
  
      )
}

export default RequirementsHub;