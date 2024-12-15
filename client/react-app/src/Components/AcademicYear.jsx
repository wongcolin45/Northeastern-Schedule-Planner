import Semester from "./Semester";
import {useState} from "react";
import PropTypes from "prop-types";
import {useContext} from "react";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";


function AcademicYear(props) {

    const {schedule, setSchedule} = useContext(ScheduleContext);

    const [visible, setVisible] = useState(true);

    function handleAddClick() {
        setSchedule(prev => {
            return prev.withNewSemester(props.yearIndex);
        })
    }

    function handleRemoveClick() {
        setSchedule(prev => {
            return prev.withLessSemester(props.yearIndex);
        })
    }
    
    return (
        <>
            <button className='year-header' onClick={() => setVisible(p => !p)}>{`Year ${props.yearIndex+1}`}</button>
            {
                visible &&
                <div className="calender-container">
                    {
                        schedule.getYearPlan(props.yearIndex).map((p, index) => {

                            return (
                                <Semester
                                    year={p.year}
                                    yearIndex={props.yearIndex}
                                    semester={p.semester}
                                    semesterIndex={index}
                                    courses={p.courses}
                                    key={props.year + p.year + p.semester + props}/>
                            )
                        })
                    }
                    <div className="add-remove-container">
                        <button className="add-semester-button" onClick={handleAddClick}
                                key={'add1'}>+
                        </button>
                        <button className="add-semester-button" onClick={handleRemoveClick}
                                key={'remove1'}>-
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default AcademicYear;

AcademicYear.propTypes = {
    yearIndex: PropTypes.number,
    year: PropTypes.number,
    setYear: PropTypes.func,
    setSchedule: PropTypes.func,
    schedule: PropTypes.array,
    component: PropTypes.R
}