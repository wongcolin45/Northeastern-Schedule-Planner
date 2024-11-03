import {useContext, useState, useEffect} from 'react';
import { ScheduleContext } from '../Pages/ScheduleMaker';

import { MyContext } from "../App";

import PropTypes from "prop-types";
import ViewableCourse from "./ViewableCourse.jsx";


function Semester(props) {

    const {schedule, setSchedule} = useContext(ScheduleContext);

    const {setCoops, startYear} = useContext(MyContext);

    const [onCoop, setOnCoop] = useState(false);

    function renderGenerateClearButton() {
        if (schedule.isSemesterFull(props.yearIndex, props.semesterIndex)) {
            return <button className='generate-schedule-button' onClick={handleClearClick}>Clear Schedule</button>
        }else {
            return <button className='generate-schedule-button' onClick={handleGenerateClick}>Generate Schedule</button>
        }
    }

    async function handleGenerateClick() {
        try {
            const scheduleCopy = schedule.getSchedule();
            await scheduleCopy.generateSemesterPlan(props.yearIndex, props.semesterIndex);
            setSchedule(scheduleCopy.getSchedule());
        } catch (error) {
            console.error("Error generating semester plan:", error);
        }
    }

    function handleClearClick() {
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.clearSemesterPlan(props.yearIndex, props.semesterIndex);
            return newSchedule;
        })
    }

    function renderContent() {
        const courses = schedule.getSemesterPlan(props.yearIndex, props.semesterIndex).courses;
        const name = (onCoop) ? 'Coop 👨‍💻' : 'Class 📚';

        return (
            <>
                {
                courses.map((course, index) => {
                    return <ViewableCourse course={course}
                                           index={index}
                                           semesterIndex={props.semesterIndex}
                                           yearIndex={props.yearIndex}
                                           key={index}/>
                })
                }
                <div className={'semester-bottom-container'}>
                    {renderGenerateClearButton()}
                    <button onClick={() => setOnCoop(p=> !p)}
                            className='coop-button'
                            style={{height: '30px'}}
                        >{name}</button>
                </div>
            </>
        )
    }



    useEffect(() => {
        if (onCoop) {
            setCoops(prev => {
                const newCoops = [...prev];
                const name = `${props.semester} Coop - ${startYear + props.yearIndex}`;
                if (!newCoops.includes(name)) {
                    newCoops.push(name)
                }
                return newCoops;
            })
        }
    }, [onCoop]);

    return (
        <div className="semester-container">
            <h1>{props.semester}</h1>
            {renderContent()}
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