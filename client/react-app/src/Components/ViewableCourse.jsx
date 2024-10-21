
import PropTypes from 'prop-types';
import {useContext} from "react";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";


function ViewableCourse(props) {

    const {courseSelection, setSchedule, courseTakenBefore} = useContext(ScheduleContext);




    if (props.course === null) {
        return (
            <div className='course-container' key={props.index}>
                <button className="course-selection" key={props.index} onClick={() => handleClick(props.index)}></button>
                <button className='trash-button' key={'trash' + props.index}>🗑️</button>
            </div>
        )
    }







    function getStyle() {
        if (!courseTakenBefore(props.course, props.course.prerequisite)) {
            return {outline: '1px solid red'}
        }
        return {}
    }


    const getName = () => props.course.courseCode + ' - ' + props.course.className;

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

    return (
        <>
            {(!courseTakenBefore(props.course, props.course.prerequisite)) && <span className='warning-message'>{`*Missing Prerequisite: ${props.course.prerequisite}`}</span>}
            <div className='course-container' key={props.index}>

                <button className="course-selection"
                        key={props.index}
                        onClick={() => handleClick(props.index)}
                        style={getStyle()}>
                    {getName()}

                </button>
                <button key={'trash' + props.index}
                        className='trash-button'
                        onClick={() => handleTrashClick(props.index, name)}>🗑️</button>
            </div>
        </>

    )
}

export default ViewableCourse;

ViewableCourse.propTypes = {
    course: PropTypes.object,
    index: PropTypes.number.isRequired,
    semesterIndex: PropTypes.number.isRequired,
    yearIndex: PropTypes.number.isRequired,

}