import Header from "../Components/Header.jsx";
import {fetchAPCourses} from "../API/requirementsAPI.js";
import {useEffect, useState, useContext} from "react";
import {MyContext} from "../App.jsx";
import '../Styles/TransferCredit.css';
import Loader from "../Components/Loader.jsx";

/**
 * This is the Transfer Elements Page.
 */
function TransferCredit() {
    const { apCourses, schedule, setSchedule} = useContext(MyContext);

    /**
     * This represents all the AP courses a student can take.
     */
    const [courses, setCourses] = useState([]);

    /**
     * This stores all the ap courses a student has taken.
     */

    /**
     * Keeps track of the user input in the search bar.
     */
    const [input, setInput] = useState("");


    /**
     * Fetches the AP courses from backend on first render.
     */
    useEffect(() => {
        if (courses.length === 0) {
            fetchAPCourses().then(data => {
                setCourses(data);
            });
        }
    },[]);

    useEffect(() => {
        schedule.getAPCourses().forEach((course) => {
            console.log(course.className);
        })
    },[schedule])

    /**
     * Helper for renderCourses(),
     * If courses taken returns button that when pressed will add it to coursesTaken.
     * Otherwise, returns button that when pressed will remove it from coursesTaken.
     * @param course the course to get
     * @param index the index value
     * @returns {JSX.Element} the button component
     */
    function getCourseButton(course, index) {

        if (schedule.isAPCourseTaken(course)) {
            return (
                <button key={index+course}
                    style={{'textDecoration': 'line-through', 'backgroundColor': 'grey'}}
                    onClick={() => handleRemoveClick(course)}>
                {course.className}</button>
            )
        }
        return (
            <button key={index+course}
                    onClick={() => handleAddClick(course)}>
                {course.className}</button>
        )
    }

    /**
     * Renders the list of ap courses possible under the search bar.
     * @returns {JSX.Element} the ap courses component
     */
    function renderCourses() {
        return (
            <div className='ap-courses-container'>
            {
                courses.map(((course, index) => {
                    if (course.className.toLowerCase().includes(input.toLowerCase())) {
                       return getCourseButton(course, index);
                    }
                }))
            }
                {(courses.length === 0) &&
                    (<>
                        <br></br>
                        <br></br>
                        <Loader/>
                    </>)
                }
            </div>
        )
    }

    function handleAddClick(course) {
        console.log('course clicked');
        console.log(course);
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.addAPCourse({...course, className: course.className});
            return newSchedule;
        });
    }

    function handleRemoveClick(course) {
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.addAPCourse(course);
            return newSchedule;
        });
    }

    function handleClearClick() {
        setSchedule(prev => {
            const newSchedule = prev.getSchedule();
            newSchedule.clearAPCourses();
            return newSchedule;
        })
    }

    function renderResultsTable() {
        const creditsMessage = `${apCourses.length * 4} / 32 credits earned`;
        let left = 8;
        return (
            <div className="results-container">
                <h2>{`Equivalent Transfer Credit (${creditsMessage})`}</h2>
                <table className="results-table">
                    <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Equivalent NU Courses</th>
                        <th>Attributes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        schedule.getAPCourses().map((course, index) => {
                            const match = (course.courseMatch) ? course.courseMatch : 'N/A';
                            const attributes = (course.attributes) ? course.attributes : 'N/A';
                            left--;
                            return (
                                <tr key={index}>
                                    <th>{course.className}</th>
                                    <th>{match}</th>
                                    <th>{attributes}</th>
                                </tr>
                            )
                        })
                    }
                    {Array.from({ length: left }).map((_, index) => (
                        <tr key={`empty-${index}`}>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    ))}

                    </tbody>
                </table>
                <button onClick={handleClearClick}>Clear</button>
            </div>
        )
    }

    return (
        <>
            <Header/>
            <div className='description-container'>
                <h2>AP Credit Policy</h2>
                <p>Northeastern accepts score of 4 or 5 for credit.
                    32 semester hours of advance credit may count towards total program hours.
                    Receiving scores prior to enrollment is preferred</p>
                <h2>Do AP Courses Count for meeting NUpath Requirements?</h2>
                <p>Yes. You can meet up to 5 of the NUpath requirements through any combination
                    of transferred credits and/or test-based credits such as AP or IB.
                    There are three exceptions to this rule: 1) you cannot transfer credit for Capstone,
                    2) you cannot transfer credit for Integrating Knowledge and Skills through Experience, and
                    3) you cannot transfer credit for Writing Intensive in the major. Check out the Transfer Database
                    for specific attributes per course or test.</p>
            </div>
            <div className='main-container'>
                <div className="transfer-container">
                    <h2>Search for AP Courses Here:</h2>
                    <input value={input} onChange={e => setInput(e.target.value)}></input>
                    {renderCourses()}
                </div>
                {
                renderResultsTable()
                }
            </div>
        </>
    )
}

export default TransferCredit;