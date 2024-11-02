
import Calender from "../Components/Calender";
import SelectionBar from "../Components/SelectionBar";
import {useState, useEffect, createContext, useContext} from 'react';
import '../Styles/Schedule.css';
import { MyContext } from "../App";
import Header from "../Components/Header";
import {convertAttributes} from "../Helpers/converter.jsx";

export const ScheduleContext = createContext();



function ScheduleMaker() {

    const { setPath, apCourses, schedule, setSchedule} = useContext(MyContext);

    const scrollToBottom = () => {
        console.log('scroll to bottom called');
        window.scrollTo({
            bottom: document.documentElement.scrollHeight, // Scroll to the total height of the document
            behavior: 'smooth', // Smooth scrolling effect
        });
    };

    const [courseSelection, setCourseSelection] = useState();

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

                                          scrollToBottom,
                                          schedule,setSchedule}}>
            <Header/>
            <SelectionBar courseSelection={courseSelection} setCourseSelection={setCourseSelection}

            />
            <Calender courseSelection={courseSelection}
            />
        </ScheduleContext.Provider>
        </div>
    )
}

export default ScheduleMaker;