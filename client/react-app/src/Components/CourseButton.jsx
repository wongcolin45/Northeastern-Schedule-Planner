import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from '../App';

function CourseButton(props) {

    const context = useContext(MyContext);

    const {courses, setCourses} = context;


    const isComplete = () => (courses.some(c => c.courseCode === props.courseCode)) ? '☑️' : '☐';
    

    function handleClick() {  
        if (isComplete() === '☐' && !courses.some(c => c.courseCode === props.courseCode)) {
            setCourses(c => {
                const newCourses = [...c]
                const courseInfo = {courseCode: props.courseCode, 
                                    courseName: props.name,
                                    requirementName: props.requirementName, 
                                    sectionName: props.sectionName};
                newCourses.push(courseInfo);
                return newCourses;
            });
        }else {
            setCourses(c => c.filter(c => c.courseCode !== props.courseCode));
        }
            
                         
    }
    
    return (
        <button className="course-button" 
                onClick={handleClick}  style= {{background: props.background}}>
                {isComplete() + ' ' + props.name}   
        </button>
    )
}

export default CourseButton;