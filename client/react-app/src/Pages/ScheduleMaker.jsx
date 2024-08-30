
import Calender from "../Components/Calender";
import NavBar from "../Components/NavBar";
import SelectionBar from "../Components/SelectionBar";
import React, {useState, useEffect, createContext, useContext} from 'react';
import '../Styles/Schedule.css';
import { MyContext } from "../App";

export const ScheduleContext = createContext();

function ScheduleMaker(props) {

    const {startYear} = useContext(MyContext);

    const [schedule, setSchedule] = useState([{ Year: 1, 
                                                plans: [{year: startYear, semester: "Fall", courses: [null, null, null, null]}]
                                              }]);

    const [courseSelection, setCourseSelection] = useState();

    const [slotSelection, setSelection] = useState();

    function courseTaken(course) {
        if (!schedule) {
            return false;
        }
       
       
        const result = schedule.some(y => {
            return y.plans.some(p => {
                    return p.courses.some(c => {  
                        return c !== null && c.courseCode === course.courseCode
                    })
                })
        })
        //console.log(`result is ${result}`);
        return result;
    }

    useEffect(() => {
        //console.log(`course selctino is `);
        //console.log(courseSelection);
    },[courseSelection])

    useEffect(() => {
        //console.log('setting to null')
        
        setCourseSelection(null);
    },[schedule])


    return (
        <ScheduleContext.Provider value={{courseSelection: courseSelection, setCourseSelection: setCourseSelection,
                                          schedule: schedule, setSchedule: setSchedule}}>
            <NavBar/>
            <SelectionBar courseSelection={courseSelection} setCourseSelection={setCourseSelection}
                        courseTaken={courseTaken}
            />
            <Calender schedule={schedule} setSchedule={setSchedule}
                      courseSelection={courseSelection}
                      slotSelection={slotSelection}
            />
        </ScheduleContext.Provider>
    )
}

export default ScheduleMaker;