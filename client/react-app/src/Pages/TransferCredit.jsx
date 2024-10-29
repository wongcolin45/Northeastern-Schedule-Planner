import Header from "../Components/Header.jsx";
import {fetchAPCourses} from "../API/requirementsAPI.js";
import {useEffect, useState, useContext} from "react";
import {MyContext} from "../App.jsx";
import {convertAttributes} from "../Helpers/converter.jsx";
import '../Styles/TransferCredit.css';

/**
 * This is the Transfer Elements Page.
 */
function TransferCredit() {
    const {setPath} = useContext(MyContext);

    /**
     * This represents all the AP courses a student can take.
     */
    const [courses, setCourses] = useState([]);

    /**
     * This stores all the ap courses a student has taken.
     */
    const [coursesTaken, setCoursesTaken] = useState(loadAPCourses());

    /**
     * Keeps track of the user input in the search bar.
     */
    const [input, setInput] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAPCourses();
            setCourses(data);
        }
        if (courses.length === 0) {
            fetchData();
        }
    },[]);

    /**
     * When coursesTaken is changed,
     * for all the courses check if they satisfy any
     */
    useEffect(() => {
        coursesTaken.forEach((course) => {
            const attributes = convertAttributes(course.attributes);
            const courseName = `AP ${course.name}`;
            console.log('got attributes '+ attributes);
            setPath(prev => {
                const newData = {...prev};
                attributes.forEach(attribute => {
                    console.log('added to '+attribute);
                    newData[attribute].add(courseName);
                })


                return newData;
            })
        })
        localStorage.setItem("apCourses", JSON.stringify(coursesTaken));
    },[coursesTaken]);

    function loadAPCourses() {
        const apCourses = localStorage.getItem('apCourses');
        if (apCourses) {
            return JSON.parse(apCourses);
        }
        return [];
    }

    /**
     * Checks if the Course is taken.
     * @param course the course to check
     * @returns {boolean} true if ap course is taken
     */
    function courseTaken(course) {
        return coursesTaken.some(c => c.name === course.name);
    }

    /**
     * Helper for renderCourses(),
     * If courses taken returns button that when pressed will add it to coursesTaken.
     * Otherwise, returns button that when pressed will remove it from coursesTaken.
     * @param course the course to get
     * @param index the index value
     * @returns {JSX.Element} the button component
     */
    function getCourseButton(course, index) {
        if (courseTaken(course)) {
            return (
                <button key={index+course}
                    style={{'textDecoration': 'line-through', 'backgroundColor': 'grey'}}
                    onClick={() => handleRemoveClick(course)}>
                {'AP ' + course.name}</button>
            )
        }
        return (
            <button key={index+course}
                    onClick={() => handleAddClick(course)}>
                {'AP '+course.name}</button>
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
                    if (course.name.toLowerCase().includes(input.toLowerCase())) {
                       return getCourseButton(course, index);
                    }
                }))
            }
            </div>
        )
    }


    /**
     * Adds the courses to coursesTaken.
     * @param course the course to add
     */
    function handleAddClick(course) {
        if (coursesTaken.length < 8) {
            setCoursesTaken(prev => {
                const newCourses = [...prev];
                newCourses.push(course);
                return newCourses;
            });
        }

    }

    /**
     * Removes the course from coursesTaken.
     * @param course the course to remove
     */
    function handleRemoveClick(course) {

        setCoursesTaken(prev => {
            const newCourses = [...prev];
            const index = newCourses.findIndex(c => c.name === course.name);

            // Only splice if the course was found
            if (index !== -1) {
                newCourses.splice(index, 1);  // Corrected to use splice
            }

            console.log('Removing courses now:');


            return newCourses;
        });
    }


    function handleClearClick() {
        setPath(prev => {
            const newPath = {...prev};
            for (const key in newPath) {
                coursesTaken.forEach(course => {
                    newPath[key].delete('AP '+course.name); // Delete from the set
                });
            }
            return newPath;
        });
        coursesTaken.forEach((course) => {
            setPath(prev => {
                const newPath = {...prev};
                for (const key in newPath) {
                    newPath[key].delete(course.name)
                }
                return newPath;
            });
        })
        setCoursesTaken([]);
    }
    /**
     * Gets the Results Table Component for AP Courses.
     * Follows structure: name | equivalent northeastern course | nu attributes
     * @returns {JSX.Element} the component
     */
    function renderResultsTable() {
        const creditsMessage = `${coursesTaken.length * 4} / 32 credits earned`;
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
                        coursesTaken.map((course, index) => {
                            const match = (course.courseMatch) ? course.courseMatch : 'N/A';
                            const attributes = (course.attributes) ? course.attributes : 'N/A';
                            left--;
                            return (
                                <tr key={index}>
                                    <th>{'AP ' + course.name}</th>
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