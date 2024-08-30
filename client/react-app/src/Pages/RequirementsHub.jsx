import Requirements from "../Components/Requirements";
import ConcentrationSelector from "../Components/ConcentrationSelector";
import NavBar from "../Components/NavBar";
import NUPath from "../Components/NUPath";
import '../Styles/Requirements.css';
import SaveRequirementsButton from "../Components/SaveRequirements";

function RequirementsHub() {

    

    return (
       
            <div>
                <NavBar/>
                <div className='requirementHub-container'>
                    <Requirements/>
                    <div className="subsections-container">
                        <SaveRequirementsButton/>
                        <ConcentrationSelector/>
                    </div>
                    
                </div>
            </div>
  
      )
}

export default RequirementsHub;