import AcademicYear from "./AcademicYear";

import PropTypes from "prop-types";
import '../Styles/Calendar.css';
import {useContext} from "react";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";


function Calender(props) {

    const {schedule, setSchedule} = useContext(ScheduleContext);

    function handleAddYearClick() {

        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.addYear();
            return newSchedule;
        })
    }

    function handleRemoveYearClick() {
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.removeYear();
            return newSchedule;
        })
    }

    return (
        <div className='calender-section'>
            <div>
                {
                    schedule.getPlans().map((_,index) => {
                        return <AcademicYear schedule={props.schedule} setSchedule={props.setSchedule} yearIndex={index} key={index}/>         
                    })
                }
            </div>
            <div className="change-year-container">
                <button className="add-year-button" onClick={handleAddYearClick}>Add Year</button>
                <button className="add-year-button" onClick={handleRemoveYearClick}>Remove Year</button>
            </div>
        </div>
    )
}

export default Calender;

Calender.propTypes = {
    schedule: PropTypes.array,
    setSchedule: PropTypes.func

}