import Requirements from "../Components/Requirements";
import ConcentrationSelector from "../Components/ConcentrationSelector";
import NavBar from "../Components/NavBar";
import NUPath from "../Components/NUPath";
import '../Styles/Requirements.css';


function RequirementsHub() {

    

    return (
       
            <div>
                <NavBar/>
                <div className='requirementHub-container'>
                    <Requirements/>
                    <div className="subsections-container">
                        <ConcentrationSelector/>
                    </div>
                    
                </div>
            </div>
  
      )
}

export default RequirementsHub;