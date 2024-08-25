import Requirements from "../Components/Requirements";
import ConcentrationSelector from "../Components/ConcentrationSelector";
import NavBar from "../Components/NavBar";
import NUPath from "../Components/NUPath";
import TransferCredits from "../Components/TransferCredits";
import '../Styles/Requirements.css';

function RequirementsHub(props) {

    

    return (
       
            <div>
                <NavBar/>
                <div className='requirementHub-container'>
                    <Requirements/>
                    <div className="subsections-container">
                 
                        <NUPath/>
                        <ConcentrationSelector/>
                    </div>
                    
                </div>
            </div>
  
      )
}

export default RequirementsHub;