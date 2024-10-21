import {useContext, useState, useEffect} from 'react';
import { ScheduleContext } from '../Pages/ScheduleMaker';
import { fetchSchedule } from '../API/courseRequirementsAPI';
import PropTypes from "prop-types";
import ViewableCourse from "./ViewableCourse.jsx";


function Semester(props) {

    const {schedule, setSchedule} = useContext(ScheduleContext);

    const [full, setFull] = useState(false);

    useEffect(() => {
        const Year = schedule[props.yearIndex].plans;
        const courses = Year[props.semesterIndex].courses;
        if (courses.every(course => course !== null)) {
            setFull(true);
        }else {
            setFull(false);
        }
    })


    function renderGenerateClearButton() {
        if (full) {
            return <button className='generate-schedule-button' onClick={handleClearClick}>Clear Schedule</button>
        }else {
            return <button className='generate-schedule-button' onClick={handleGenerateClick}>Generate Schedule</button>
        }
    }
    
    function handleGenerateClick() {
        const getSchedule = async () => {
            const plan = await fetchSchedule(schedule);
            if (plan.length !== 0) {
                setSchedule(prev => {
                    const newSchedule = [...prev];
    
                    const Year = newSchedule[props.yearIndex].plans;
    
                    const courses = Year[props.semesterIndex].courses;
    
                    for (let i = 0; i < 4; i++) {
                        if (courses[i] === null) {
                            if (plan.length <= 0) {
                                return newSchedule;
                            }
                            courses[i] = plan.pop();

                        }
                    }
                    return newSchedule;
                })
            }
            

        }
        getSchedule();
        
    }

    function handleClearClick() {
        setSchedule(prev => {
            const newSchedule = [...prev];

            const Year = newSchedule[props.yearIndex].plans;

            Year[props.semesterIndex].courses = [null, null, null, null];

            return newSchedule;
        }) 
    }

    return (
        <div className="semester-container">
            <h1>{props.semester}</h1>
            {
                props.courses.map((course, index) => {
                    return <ViewableCourse course={course}
                                           index={index}
                                           semesterIndex={props.semesterIndex}
                                           yearIndex={props.yearIndex}
                                           key={index}/>
                      
                })
            }
            {renderGenerateClearButton()}
        </div>
    )
}

export default Semester;

Semester.propTypes = {
    yearIndex: PropTypes.number,
    semesterIndex: PropTypes.number,
    semester: PropTypes.string,
    courses: PropTypes.array,
    year: PropTypes.number
}