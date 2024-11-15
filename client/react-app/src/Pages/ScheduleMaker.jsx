
import Calender from "../Components/Calender";
import SelectionBar from "../Components/SelectionBar";
import {useState, createContext, useContext} from 'react';
import '../Styles/Schedule.css';
import { MyContext } from "../App";
import Header from "../Components/Header";


export const ScheduleContext = createContext();


function ScheduleMaker() {

    const {schedule, setSchedule} = useContext(MyContext);

    const scrollToBottom = () => {

        window.scrollTo({
            bottom: document.documentElement.scrollHeight, // Scroll to the total height of the document
            behavior: 'smooth', // Smooth scrolling effect
        });
    };

    const [courseSelection, setCourseSelection] = useState(null);


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