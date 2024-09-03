import React, {useContext, useState} from 'react';
import { ScheduleContext } from '../Pages/ScheduleMaker';
import { fetchSchedule } from '../API/courseRequirementsAPI';



function Semester(props) {

    const {courseSelection, schedule, setSchedule} = useContext(ScheduleContext);

    const [scheduleMade, setScheduleMade] = useState([]);

    function getBackground() {
        if (props.semesterIndex === 0) {
            return {backgroundColor: "#FF6F00"}
        }else if (props.semesterIndex === 1) {
            return {backgroundColor: "#98FF98"}
        }
        return {backgroundColor: "#FFF700"}

    }

    function handleClick(index) { 
        if (courseSelection) {
            setSchedule(prev => {
               
                const newSchedule = [...prev];

                const Year = newSchedule[props.yearIndex].plans;


                const courses = Year[props.semesterIndex].courses;

                courses[index] = courseSelection;

                return newSchedule;
            })
        }else {
            console.log('no course has been selected');
        }
    }

    function handleTrashClick(index, name) {
        
        if (name.length > 0) {
            setSchedule(prev => {
                const newSchedule = [...prev];
                
                const Year = newSchedule[props.yearIndex].plans;
    
                const courses = Year[props.semesterIndex].courses;
    
                courses[index] = null;
    
                return newSchedule;
            })
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

    return (
        <div className="semester-container" style={getBackground()}>
            <h1>{props.semester + ' - '+ props.year}</h1>
            {
                props.courses.map((course, index) => {
                    const name = (course !== null) ? (course.courseCode + ' - ' + course.className) : '';
                    return (
                        <div className='course-container' key={index}>
                            <button className="course-selection" 
                                    key={index}
                                    onClick={() => handleClick(index)}>
                                {name}
                            </button> 
                            <button key={'trash' + index} 
                                    className='trash-button'
                                    onClick={() => handleTrashClick(index, name)}>🗑️</button>
                        </div>
                    )         
                })
            }
            <button className='generate-schedule-button' onClick={handleGenerateClick}>Generate Schedule</button>
        </div>
    )
}

export default Semester;