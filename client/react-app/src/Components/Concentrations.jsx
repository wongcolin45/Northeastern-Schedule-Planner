import React, {useState, useEffect} from 'react';
import Section from './Section.jsx';
import { fetchConcentration } from '../API/courseRequirementsAPI.js';
function Concentration(props) {

    const [outline, setOutline] = useState([]);
    
    useEffect(() => {  
        async function setConcentration() {
            const data = await fetchConcentration(props.concentration);
            setOutline(data);
        }
        setConcentration();
    },[props.concentration]);
  
    if (outline.length === 0 || outline === undefined) {
        return <h1>Your SQLite database isn't working!</h1>
    }

    return (
        <>
                {
                    outline.sections.map((section, index) => {
                        return <Section section={section} 
                                        key={props.concentration+section.name+index}
                                        courses={props.courses}
                                        setCourses={props.setCourses}
                                        requirementName={props.concentration}
                                        ></Section>
                    })   
                }
        </>
    )
}

export default Concentration;

