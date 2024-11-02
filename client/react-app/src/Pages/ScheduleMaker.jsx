
import Calender from "../Components/Calender";
import SelectionBar from "../Components/SelectionBar";
import {useState, useEffect, createContext, useContext} from 'react';
import '../Styles/Schedule.css';
import { MyContext } from "../App";
import Header from "../Components/Header";
import {convertAttributes} from "../Helpers/converter.jsx";
import Schedule from "../utils/Schedule.js";
export const ScheduleContext = createContext();

const start = new Schedule(2024);

function ScheduleMaker() {

    const {startYear, setPath, apCourses} = useContext(MyContext);

    const scrollToBottom = () => {
        console.log('scroll to bottom called');
        window.scrollTo({
            bottom: document.documentElement.scrollHeight, // Scroll to the total height of the document
            behavior: 'smooth', // Smooth scrolling effect
        });
    };

    const [oldSchedule, setOldSchedule] = useState(loadSchedule);

    const [schedule, setSchedule] = useState(start);

    const [courseSelection, setCourseSelection] = useState();

    function courseTakenBefore(courseCode, prerequisiteCode) {
        if (!oldSchedule || courseCode === null || prerequisiteCode === null) {
            return true;
        }
        for (const y of oldSchedule) {
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
        return false;
    }

    function courseTaken(courseCode) {
        if (!oldSchedule || courseCode === null) {
            return true;
        }

        return oldSchedule.some(y =>
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
                // Convert the Set to an array, filter out non-'AP' values, and reassign the filtered Set
                newPath[key] = new Set(
                    [...newPath[key]].filter(name => name.includes('AP '))
                );
            }
            return newPath;
        })
    }

    function loadSchedule() {
        const savedSchedule = localStorage.getItem('userSchedule');
        if (savedSchedule) {
            return JSON.parse(savedSchedule);
        }
        return [{ Year: 1,
            plans: [{year: startYear, semester: "Fall", courses: [null, null, null, null]},
                    {year: startYear, semester: "Spring", courses: [null, null, null, null]}]
        }];


    }

    useEffect(() => {
        clearNUPath();
        oldSchedule.forEach(year => {
            year.plans.forEach(p =>{
                p.courses.forEach(course => {
                    if (course != null) {
                        updateNUPath(course);
                    }
                })
            })
        })
    }, [oldSchedule])



    // useEffect(() => {
    //     setCourseSelection(null);
    //     if (schedule) {
    //         localStorage.setItem('userSchedule', JSON.stringify(schedule));
    //     }
    // },[schedule])

    useEffect(() => {
        apCourses.forEach((course) => {
            const attributes = convertAttributes(course.attributes);
            const courseName = `AP ${course.name}`;
            setPath(prev => {
                const newData = {...prev};
                attributes.forEach(attribute => {
                    newData[attribute].add(courseName);
                })
                return newData;
            })
        });
    },[apCourses]);





    return (
        <div className="ScheduleMaker-container">
        <ScheduleContext.Provider value={{courseSelection, setCourseSelection,
                                          oldSchedule, setOldSchedule,
                                          courseTaken, courseTakenBefore,
                                          scrollToBottom,
                                          schedule,setSchedule}}>
            <Header/>
            <SelectionBar courseSelection={courseSelection} setCourseSelection={setCourseSelection}
                        courseTaken={courseTaken}
            />
            <Calender schedule={oldSchedule} setSchedule={setOldSchedule}
                      courseSelection={courseSelection}
            />
        </ScheduleContext.Provider>
        </div>
    )
}

export default ScheduleMaker;