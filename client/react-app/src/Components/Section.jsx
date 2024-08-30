import CourseButton from "./CourseButton";
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from '../App';


function Section(props) {

    const {courses, incomplete, setIncomplete, courseTaken, outline} = useContext(MyContext);
   
    const [message, setMessage] = useState(`(${props.section.coursesRequired} left)`);

    const [left, setLeft] = useState(props.section.coursesRequired);
 
    const [background, setBackground] = useState("lightcoral");

    const unique = (name) => name.includes('not already taken');

    function calculateLeft() {
       
        let total = props.section.coursesRequired;  
        props.section.courses.forEach((course) => {
            const i = courses.findIndex(c => c.courseCode === course.courseCode);
                       
            if (i !== -1) {

                const sectionMatch = courses[i].requirementName == props.requirementName && 
                                     courses[i].sectionName == props.section.name;

                const fillingUnique = !unique(props.section.name) && unique(courses[i].requirementName);

                if (sectionMatch || fillingUnique) {
                    total--;
                }
            }
            
        });
       
        return total;
    }


    useEffect(() => {
        const newLeft = calculateLeft()
        setLeft(newLeft);
        setMessage(m => (newLeft <= 0 ) ? '(Complete)' : `(${newLeft} left)`);
        setBackground(b => {
            if (newLeft <= 0) {
                return "lightgreen";
            }else if (newLeft < props.section.coursesRequired) {
                return "lightsalmon";
            }else{
                return "lightcoral"
            }
        })
    }, [courses])

    const getHeader = () => (props.section.name.includes('section')) ? props.section.name.slice(0, 12) : props.section.name;
         

    return (
        <div className="section-container" style={{background: background}}>
            <h2>{getHeader() + message}</h2>
            {
                props.section.courses.map((c, index) => {
                const m = (c.mandatory) ? '(M)' : '';
                const name = c.courseCode + '  -  ' + c.className + m;
                return <CourseButton key={c+index} 
                                     name={name} 
                                     courseCode={c.courseCode}
                                     background={background}
                                     limit = {props.section.coursesRequired}
                                     requirementName = {props.requirementName}
                                     sectionName = {props.section.name}
                                     />
            })}
        </div>
    )

}

export default Section;