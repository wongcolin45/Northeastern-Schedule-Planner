import AcademicYear from "./AcademicYear";

import PropTypes from "prop-types";
import '../Styles/Calendar.css';


function Calender(props) {

    function handleAddYearClick() {
        props.setSchedule(prev => {

            const newSchedule = [...prev];
            const l = prev[prev.length -1].plans.length
            const year = prev[prev.length - 1].plans[l - 1].year + 1;

            newSchedule.push({Year: year, 
                              plans: 
                              [{year: year, semester: "Fall", courses: [null, null, null, null]},
                              {year: year, semester: "Spring", courses: [null, null, null, null]}]
                            });

            return newSchedule;
        })
    }

    function handleRemoveYearClick() {
        if (props.schedule.length > 1) {
            props.setSchedule(s => {
              
                const newSchedule = [...s];
                newSchedule.pop();
                return newSchedule;
            })
        }
    }
    

    return (
        <div className='calender-section'>
            <div>
                {
                    props.schedule.map((_,index) => {
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