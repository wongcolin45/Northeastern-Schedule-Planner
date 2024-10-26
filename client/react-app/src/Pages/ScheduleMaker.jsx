
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

    const scrollToBottom = () => {
        console.log('scroll to bottom called');
        window.scrollTo({
            bottom: document.documentElement.scrollHeight, // Scroll to the total height of the document
            behavior: 'smooth', // Smooth scrolling effect
        });
    };

    const [schedule, setSchedule] = useState([{ Year: 1, 
                                                plans: [{year: startYear, semester: "Fall", courses: [null, null, null, null]}]
                                              }]);

    const [courseSelection, setCourseSelection] = useState();

    function courseTakenBefore(courseCode, prerequisiteCode) {
        if (!schedule || courseCode === null || prerequisiteCode === null) {
            return true;
        }

        for (const y of schedule) {
            for (const p of y.plans) {
                for (const c of p.courses) {
                    if (c !== null) {
                       if (c.courseCode === courseCode) {
                           return false;
                       }else if (c.courseCode === prerequisiteCode) {
                           return true;
                       }
                    }
                }
            }
        }
    }

    function courseTaken(courseCode) {
        if (!schedule || courseCode === null) {
            return true;
        }

        return schedule.some(y =>
            y.plans.some(p =>
                p.courses.some(c => {
                    return (c != null && c.courseCode === courseCode)

                })
            )
        );
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
        <div className="ScheduleMaker-container">
        <ScheduleContext.Provider value={{courseSelection, setCourseSelection,
                                          schedule, setSchedule,
                                          courseTaken, courseTakenBefore,
                                          scrollToBottom}}>
            <Header/>
            <SelectionBar courseSelection={courseSelection} setCourseSelection={setCourseSelection}
                        courseTaken={courseTaken}
            />
            <Calender schedule={schedule} setSchedule={setSchedule}
                      courseSelection={courseSelection}
            />
        </ScheduleContext.Provider>
        </div>
    )
}

export default ScheduleMaker;