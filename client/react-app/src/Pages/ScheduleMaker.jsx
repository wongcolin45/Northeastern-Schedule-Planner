
import Calender from "../Components/Calender";
import SelectionBar from "../Components/SelectionBar";
import {useState, useEffect, createContext, useContext} from 'react';
import '../Styles/Schedule.css';
import { MyContext } from "../App";
import Header from "../Components/Header";
import {convertAttributes} from "../Helpers/converter.jsx";

export const ScheduleContext = createContext();

function ScheduleMaker() {

    const {startYear, setPath} = useContext(MyContext);

    const [schedule, setSchedule] = useState([{ Year: 1, 
                                                plans: [{year: startYear, semester: "Fall", courses: [null, null, null, null]}]
                                              }]);

    const [courseSelection, setCourseSelection] = useState();



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
        return result;
    }


    function updateNUPath(courseData) {
        const data = courseData.attributes;
        if (data != null) {
            const attributes = convertAttributes(data);
            setPath(prev => {
                const newData = {...prev};
                attributes.forEach(attribute => {
                    newData[attribute].add(courseData.className);
                })


                return newData;
            })
        }
    }

    function clearNUPath() {
        setPath(prev => {
            const newPath = {...prev};
            for (let key in newPath) {
                newPath[key].clear();
            }
            return newPath;
        })

    }

    useEffect(() => {
        clearNUPath();
        schedule.forEach(year => {
            year.plans.forEach(p =>{
                p.courses.forEach(course => {
                    if (course != null) {
                        updateNUPath(course);
                    }
                })
            })
        })
    }, [schedule])

    useEffect(() => {
        setCourseSelection(null);
    },[schedule])


    return (
        <ScheduleContext.Provider value={{courseSelection, setCourseSelection,
                                          schedule, setSchedule, courseTaken}}>
            <Header/>
            <SelectionBar courseSelection={courseSelection} setCourseSelection={setCourseSelection}
                        courseTaken={courseTaken}
            />
            <Calender schedule={schedule} setSchedule={setSchedule}
                      courseSelection={courseSelection}
            />
        </ScheduleContext.Provider>
    )
}

export default ScheduleMaker;