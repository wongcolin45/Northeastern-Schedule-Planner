
import {useContext} from "react";
import PropTypes from "prop-types";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";

function CourseButton(props) {
    const {courseTaken, courseSelection, setCourseSelection} = useContext(ScheduleContext);



    if (courseTaken(props.course.courseCode)) {
        return (
            <button
                style={{ textDecoration: 'line-through' }}>
                {props.course.courseCode + ' - ' + props.course.className}
            </button>
        )
    }

    const style = (courseSelection === props.course) ? {backgroundColor : "lightyellow"} : {};

    return (
        <button
                onClick={() => setCourseSelection(props.course)}
                style={style}>
            {props.course.courseCode + ' - ' + props.course.className}
        </button>
    )
}

export default CourseButton;

CourseButton.propTypes = {
   course: PropTypes.object.isRequired,
}