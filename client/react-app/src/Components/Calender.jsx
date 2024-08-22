import AcademicYear from "./AcademicYear";
import Semester from "./Semester";
import React, {useState} from 'react';


function Calender(props) {

    

    function handleAddYearClick() {
        props.setSchedule(prev => {
            const newSchedule = [...prev];
            const year = prev[prev.length - 1].Year;
            newSchedule.push({Year: year, 
                              plans: 
                              [{year: year, semester: "Fall", courses: [null, null, null, null, null]}]});
            return newSchedule;
        })
    }

    function handleRemoveYearClick() {
        if (props.schedule.length > 1) {
            props.setSchedule(s => {
                const newSchedule = [...s];
                newSchedule.pop();
                return newSchedule;
            })
        }
    }
    


   


    return (
        <>
            <div>
                {
                    props.schedule.map((_,index) => {
                        return <AcademicYear schedule={props.schedule} setSchedule={props.setSchedule} year={index} key={index}/>
                            
                    })   
                }
            </div>
            <div className="change-year-container">
                <button className="add-year-button" onClick={handleAddYearClick}>Add Year</button>
                <button className="add-year-button" onClick={handleRemoveYearClick}>Remove Year</button>
            </div>
        </>
    )
}

export default Calender;