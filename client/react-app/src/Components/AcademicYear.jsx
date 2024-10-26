import Semester from "./Semester";
import {useState} from "react";
import PropTypes from "prop-types";



function AcademicYear(props) {
    const [visible, setVisible] = useState(true);

    const YearPlan = props.schedule[props.yearIndex];

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


    function handleAddClick(index) {
        const plans = props.schedule[index].plans.length;
        
        if (plans < 3) {
            props.setSchedule(s => { 
                const newSchedule = [...s]    
                const newSemester = getNextSemester(index)
                newSchedule[index].plans.push(newSemester);
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
            <button className='year-header' onClick={() => setVisible(p => !p)}>{`Year ${props.yearIndex+1}`}</button>
            {
                visible &&
                <div className="calender-container">
                    {
                        YearPlan.plans.map((p, index) => {

                            return (
                                <Semester
                                    year={p.year}
                                    yearIndex={props.yearIndex}
                                    semester={p.semester}
                                    semesterIndex={index}
                                    courses={p.courses}
                                    key={props.year + p.year + p.semester + props}/>
                            )
                        })
                    }
                    <div className="add-remove-container">
                        <button className="add-semester-button" onClick={() => handleAddClick(props.yearIndex)}
                                key={'add1'}>+
                        </button>
                        <button className="add-semester-button" onClick={() => handleRemoveClick(props.yearIndex)}
                                key={'remove1'}>-
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default AcademicYear;

AcademicYear.propTypes = {
    yearIndex: PropTypes.number,
    year: PropTypes.number,
    setYear: PropTypes.func,
    setSchedule: PropTypes.func,
    schedule: PropTypes.array,
}