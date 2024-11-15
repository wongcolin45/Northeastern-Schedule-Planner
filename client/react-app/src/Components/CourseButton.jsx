
import {useContext} from "react";
import PropTypes from "prop-types";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";

function CourseButton(props) {
    const {courseSelection, setCourseSelection, schedule} = useContext(ScheduleContext);

    if (schedule.courseTaken(props.course.courseCode)) {
        return (
            <button
                style={{ textDecoration: 'line-through' }}>
                {props.course.courseCode + ' - ' + props.course.className}
            </button>
        )
    }

    const style = (courseSelection === props.course) ? {backgroundColor : "lightblue"} : {};

    function handleClick() {
        setCourseSelection(prev => {
            if (prev !== null && prev.courseCode === props.course.courseCode) {
                return null;
            }
            return props.course;
        });
    }

    return (
        <button
                onClick={handleClick}
                style={style}>
            {props.course.courseCode + ' - ' + props.course.className}
        </button>
    )
}

export default CourseButton;

CourseButton.propTypes = {
   course: PropTypes.object.isRequired,
}