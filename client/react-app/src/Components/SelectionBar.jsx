import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from '../App';


function SelectionBar(props) {
    const {concentration, courseSelections, concentrationSelections} = useContext(MyContext);


    const [selectionName, setSelectionName] = useState('Major Requirements');

    const [selection, setSelection] = useState([])


    useEffect(() => {
        if (courseSelections) {
            setSelection(courseSelections);
        } else if (concentrationSelections) {
            setSelection(concentrationSelections);
        }
    },[courseSelections, concentrationSelections]);


    const [current, setCurrent] = useState(0);

    useEffect(() => {

    },[concentrationSelections])
    
    function coursesTaken(index) {
        const section = selection[index];
        let count = 0;
        section.courses.forEach(course => {
            if (props.courseTaken(course)) {
                count++;
            }
        })
        return count;
    }

    function getLeft(index) {
        const section = selection[index];
        if (section.left - coursesTaken(index) <= 0) {
            return 'Complete';
        }
        return `${section.left - coursesTaken(index)}`;
    }

    function renderSection(index) {
        if (selection[index] === undefined) {
            return <p>index bad or sometihing</p>
        }

        const section = selection[index];
        if (section === undefined) {
            return <h1>Section is Undefined</h1>
        }

        return (
            <div className='course-selection-container'>
                <h1>{`${section.name} (${getLeft(index)})`}</h1>
                <div>
                {
                    section.courses.map((course, index) => {
                        const className = (props.courseSelection && props.courseSelection.courseCode === course.courseCode) 
                                          ? "course-selection-active" : "course-selection";

                        if (props.courseTaken(course)) {
                            return (
                                <button key={course+index} 
                                        className={className}
                                        style={{ textDecoration: 'line-through' }}
                                        >        
                                {course.courseCode + ' - ' + course.className}
                                </button>
                            )   
                        }

                        return (
                            <button key={course+index} 
                                    className={className}
                                    onClick={() => props.setCourseSelection(course)}
                                    >        
                            {course.courseCode + ' - ' + course.className}
                            </button>
                        )   
                    })
                }
                </div>
               
            </div>
        )
    }

    function handleLeftClick() {
        setCurrent(c => {
            return (c === 0)  ? selection.length - 1 : c - 1;
        })
    }

    function handleRightClick() {
        setCurrent(c =>{
            return (c === selection.length - 1) ? 0 : c + 1;
        })
    }

    
    function handleSelectionClick() {
        
        setSelection(s =>  {
            if (s === courseSelections) {
                return concentrationSelections
            }
            return courseSelections;
        })

        setSelectionName(n => {
            if (n === 'Major Requirements') {
                const tag = (concentration.tag.length <= 3) ? concentration.tag.toUpperCase() : concentration.name;
                return tag + ' Requirements';
            }
            return 'Major Requirements'
        });
    }

    
       

    return (
        <>
            <button className='selection-button' onClick={handleSelectionClick}>{selectionName}</button>
            <div className='section-bar'>
                <button onClick={handleLeftClick} className='left-button'>{'<'}</button>
                    {
                        renderSection(current)
                    }
                <button onClick={handleRightClick} className='right-button'>{'>'}</button>
            </div>
        </>
    )
}

export default SelectionBar;