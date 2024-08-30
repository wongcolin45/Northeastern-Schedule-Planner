import Semester from "./Semester";

import React, {useState, useContext} from 'react';

import { MyContext } from "../App";



function AcademicYear(props) {

   
    const YearPlan = props.schedule[props.yearIndex];

    const {startYear} = useContext(MyContext);

    const [hidden, setHidden] = useState(false);

    function getLastSemester(year) {
        const plans = props.schedule[year].plans.length;
        return props.schedule[year].plans[plans - 1];
    }
    
    function getNextSemester(year) {
        const lastYear = getLastSemester(year).year;
        const lastSemester = getLastSemester(year).semester;
        if (lastSemester === 'Fall') {
            return {year: lastYear + 1, semester: "Spring", courses: [null, null, null, null]}
        }
        return {year: lastYear, semester: "Summer", courses: [null, null, null, null]} 
        
    }

    function getYearHeader(year) {
        let name;
        if (year === 0) {
            name = 'Freshman';
        }else if (year === 1) {
            name = "Sophmore";
        }else if (year === 2) {
            name = "Junior";
        }else if (year === 3) {
            name = 'Senior';
        }else {
            name = "Super Senior";
        }
        return name + ` ${startYear + year} - ${startYear + year + 1}`
    }

    function handleAddClick(index) {
        const plans = props.schedule[index].plans.length;
        
        if (plans < 3) {
            props.setSchedule(s => { 
                const newSchedule = [...s]    
                const newSemester = getNextSemester(index)
                newSchedule[index].plans.push(newSemester);
                console.log('setting schedule');
                console.log(newSchedule)
                return newSchedule;
            })
        }
        
        
    }

    function handleRemoveClick(index) {
        const plans = props.schedule[index].plans.length;
        if (plans > 1) {
            props.setSchedule(s => {
                const newSchedule = [...s];
                newSchedule[index].plans.pop();
                return newSchedule;
            })
        }
    }


    return (
        <>
            <button className="year-header"
                    onClick={() => setHidden(h => !h)}
                    >{getYearHeader(props.yearIndex)}</button>
            { !hidden &&
                <div className="calender-container">
                    {
                        YearPlan.plans.map((p, index) => {
                          
                            return (
                                <Semester 
                                    year={p.year}
                                    yearIndex={props.yearIndex}
                                    semester={p.semester}
                                    semesterIndex={index}
                                    courses = {p.courses}
                                    key={props.year + p.year + p.semester+props}/>
                                )
                        })
                    }
                    <div className="add-remove-container">
                        <button className="add-semester-button" onClick={() => handleAddClick(props.yearIndex)} key={'add1'}>+</button>
                        <button className="add-semester-button" onClick={() => handleRemoveClick(props.yearIndex)} key={'remove1'}>-</button>
                    </div>
                </div>
            }
        </>
    )
}
export default AcademicYear;