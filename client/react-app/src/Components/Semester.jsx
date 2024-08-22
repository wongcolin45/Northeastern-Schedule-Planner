import React, {useContext} from 'react';
import { ScheduleContext } from '../Pages/ScheduleMaker';



function Semester(props) {

    const {courseSelection, schedule, setSchedule} = useContext(ScheduleContext);

    function getBackground() {
        if (props.info.semester === 'Fall') {
            
            return {backgroundColor: "#FF6F00"}
        }else if (props.info.semester === 'Spring') {
            return {backgroundColor: "#98FF98"}
        }
        return {backgroundColor: "#FFF700"}

    }

    function handleClick(index) { 
        if (courseSelection) {
            setSchedule(prev => {

                const newSchedule = [...prev];
                
                const Year = newSchedule[props.year].plans;
                
                const planIndex = Year.findIndex(p => {
                    return p.semester === props.info.semester;
                })

                const courses = Year[planIndex].courses;

                courses[index] = courseSelection;

                return newSchedule;
            })
        }else {
            console.log('no course has been selected');
        }
    }


    return (
        <div className="semester-container" style={getBackground()}>
            <h1>{props.info.semester + ' - '+ props.info.year}</h1>
            {
                props.info.courses.map((course, index) => {

                    
                    if (course === null) {
                        return <button className="course-selection" 
                                       key={index}
                                       onClick={() => handleClick(index)}>
                                </button>
                    }

                    return (
                        <button key={course+index} 
                                className="course-selection"
                                onClick={() => handleClick(index)}>        
                            {course.courseCode + ' - ' + course.className}
                        </button>
                    )
                    
                })
            }
        </div>
    )
}

export default Semester;