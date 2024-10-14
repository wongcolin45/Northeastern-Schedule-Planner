import AcademicYear from "./AcademicYear";




function Calender(props) {
    

    function handleAddYearClick() {
        props.setSchedule(prev => {
            const newSchedule = [...prev];
            const l = prev[prev.length -1].plans.length
            const year = prev[prev.length - 1].plans[l - 1].year + 1;
            newSchedule.push({Year: year, 
                              plans: 
                              [{year: year, semester: "Fall", courses: [null, null, null, null]}]});
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
        <>
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
        </>
    )
}

export default Calender;