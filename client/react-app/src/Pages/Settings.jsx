
import React, {useState, useContext} from 'react';
import { MyContext } from "../App";


import '../Styles/Settings.css';
import Header from "../Components/Header.jsx";

function Settings() {

    const {concentration, setConcentration, startYear, setStartYear} = useContext(MyContext);

    const concentrations = ['Artificial Intelligence', 'Human Centered Computing', 'Sotware', 'Systems', 'Foundations'];

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

    function handleResetClick() {
        localStorage.clear();
    }

    return (
        <>
            <Header/>
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
                        const style = (concentration.name === name) ? {
                            'backgroundColor': 'whitesmoke',
                            color: 'black'
                        } : {};

                        return <button key={index} style={style}
                                       onClick={() => handleConcentrationClick(name)}>{name}</button>
                    })
                }
                <h1>Start Year</h1>
                {
                    <input type="number" value={startYear} onChange={handleChange}></input>
                }
                <div className='reset-container'>
                    <h2>Want to restart from Scratch?</h2>
                    <buton id='reset-button' onClick={handleResetClick}>Reset All Data</buton>
                    <label>*You will lose all Progress</label>
                </div>
            </div>

        </>
    )


}

export default Settings;