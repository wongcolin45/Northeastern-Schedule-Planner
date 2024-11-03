
import PropTypes from 'prop-types';
import {useContext} from "react";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";


/**
 * This represents a course in the schedule view.
 */
function ViewableCourse(props) {

    const {courseSelection, setCourseSelection, setSchedule, schedule} = useContext(ScheduleContext);

    const course = schedule.getCourse(props.yearIndex, props.semesterIndex, props.index);


    if (course === null) {
        return (
            <div className='course-container' key={props.index}>
                <button className="course-selection" key={props.index} onClick={() => handleClick(props.index)}></button>
                <button className='trash-button' key={'trash' + props.index}>🗑️</button>
            </div>
        )
    }


    const hasPrerequisite = () => props.course !== null && props.course.prerequisite !== null;

    const isInvalidCourse = () => hasPrerequisite() && schedule.coursePrerequisiteMet(props.course.courseCode, props.course.prerequisite);

    const getName = () => props.course.courseCode + ' - ' + props.course.className;


    function getStyle() {
        if (isInvalidCourse()) {
            return {outline: '1px solid red'}
        }
        return {}
    }

    function handleClick(index) {
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.addCourse(props.yearIndex, props.semesterIndex, index, courseSelection);
            return newSchedule;
        })
        setCourseSelection(null);
    }

    function handleTrashClick() {
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.removeCourse(props.yearIndex, props.semesterIndex, props.index);
            return newSchedule;
        })
    }

    return (
        <>
            <div className='course-container' key={props.index}>
                <button className="course-selection"
                        key={props.index}
                        onClick={() => handleClick(props.index)}
                        style={getStyle()}>
                    {getName()}
                </button>
                <button key={'trash' + props.index}
                        className='trash-button'
                        onClick={handleTrashClick}>🗑️</button>
            </div>
            {(isInvalidCourse()) &&
                <span className='warning-message'>{`*Missing Prerequisite: ${props.course.prerequisite}`}</span>}
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