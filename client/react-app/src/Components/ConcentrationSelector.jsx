import Concentration from "./Concentrations";
import React, {useState, useContext} from 'react';
import { MyContext } from "../App";

function ConcentrationSelector(props){
    
    const [choice, setChoice] = useState('ai');


    const concentrations = ['Artificial Inteligence', 'Human Centered Computing', 'Software', 'Systems', 'Foundations'];

    const getTag = (c) => {
        if (c.length < 12) return c.toLowerCase();
        return (c.charAt(0) === 'A') ? 'ai' : 'hcc';
    }

   

    return (
        <div>
            <h1>Select a Concentration</h1>
            <div className="concentration-container">
                <div key="selection-bar" className='selection-bar'>
                    {
                        concentrations.map((c, index) => {
                            const tag = getTag(c);
                            return <button key={c+index} 
                                        className={(choice === tag) ? "button-active" : "button-inactive"}
                                        onClick={() => {
                                            setChoice(tag);
                                        }}      
                                        >{c}</button>
                        })
                    }
                </div>
                <Concentration concentration={choice}/>
            </div>
        </div>
    )
}

export default ConcentrationSelector;