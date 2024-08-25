import NavBar from "../Components/NavBar";
import React, {useState, useContext} from 'react';
import { MyContext } from "../App";


import '../Styles/Settings.css';

function Settings() {

    const {concentration, setConcentration, startYear, setStartYear} = useContext(MyContext);

    const concentrations = ['Artificial Inteligence', 'Human Centered Computing', 'Sotware', 'Systems', 'Foundations'];

    const majors = ['Computer Science', 'Data Science', 'Cybersecurity'];

    function handleConcentrationClick(name) {
        let tag;
        if (name === "Artificial Inteligence") {
            tag = 'ai';
        }else if (name === "Human Centered Computing") {
            tag = 'hcc'
        }else {
            tag = name.toLowerCase();
        }
        setConcentration({name: name, tag: tag});
    }

    function handleChange(event) {
        setStartYear(event.target.value);
        console.log('start year is '+startYear);
    }

    return (
        <>
            <NavBar/>
            <div className="profile-container">
                <h1>Academic Profile</h1>
                <h2>Select Major</h2>
                {
                    majors.map((name, index) => {

                        return <button key={index}>{name}</button>
                    })
                }
                <h2>Select Concentration</h2>
                {
                    concentrations.map((name, index) => {
                        const selected =  (concentration.name === name) ? 'selected' : '';
                        console.log('selected is '+selected);
                        return <button key={index} className={selected}
                                       onClick={() => handleConcentrationClick(name)}>{name}</button>
                    })
                } 
                <h1>Start Year</h1>
                {
                    <input type="number" value={startYear} onChange={handleChange}></input>
                }
            </div>
        </>
    )


}

export default Settings;