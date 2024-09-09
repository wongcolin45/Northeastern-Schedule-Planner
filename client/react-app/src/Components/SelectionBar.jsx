import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from '../App';


function SelectionBar(props) {
    const {concentration, courseSelections, concentrationSelections} = useContext(MyContext);

    const sections = courseSelections.concat(concentrationSelections);


    const [current, setCurrent] = useState(0);

    useEffect(() => {

    },[concentrationSelections])
    
    function coursesTaken(index) {
        const section = sections[index];
        let count = 0;
        section.courses.forEach(course => {
            if (props.courseTaken(course)) {
                count++;
            }
        })
        return count;
    }

    function getLeft(index) {
        const section = sections[index];
       
        if (section.left - coursesTaken(index) <= 0) {
            return 0;
        }
        return section.left - coursesTaken(index);
    }

    function renderCourse(course, index) {
        
       

        if (props.courseTaken(course)) {
            return (
                <button key={course+index} 
                      
                        style={{ textDecoration: 'line-through' }}
                        >        
                {course.courseCode + ' - ' + course.className}
                </button>
            )   
        }

        const style = (props.courseSelection === course) ? {backgroundColor: "yellow"} : {};

        return (
            <button key={course+index}   
                    onClick={() => props.setCourseSelection(course)}
                    style={style}
                     
                    >        
            {course.courseCode + ' - ' + course.className}
            </button>
        )  
    }

    function renderSection(index) {
        if (sections[index] === undefined) {
            return <p>index bad or sometihing</p>
        }

        const section = sections[index];
        if (section === undefined) {
            return <h1>Section is Undefined</h1>
        }

        const sectionTitle = (section.name.includes('section')) ? section.name.slice(0, -12) : section.name;
        
        const style = getBackgroundColor(index);

        return (
            <div className='course-selection-container' style={style}>
                <h1>{`${sectionTitle}`}</h1>
                <div className='courses-container'>
                {
                    section.courses.map((course, index) => {
                       return renderCourse(course, index);  
                    })
                }
                </div>
               
            </div>
        )
    }


    
    const handleClick = (index) => {
        setCurrent(index);
    }


    function getBackgroundColor(index) {
        const left = getLeft(index);
        if (left === sections[index].left) {
            return {backgroundColor: 'lightcoral'}
        }else if (left > 0) {
            return {backgroundColor: 'lightsalmon'}
        }else {
            return {backgroundColor: 'lightgreen'}
        }
    }

    function renderSelectionBar() {
        return (
            <div className='requirements-bar'>
                <h2>Computer Science Requirements</h2>
                {   
                    sections.map((section, index) => {
                        const sectionTitle = (section.name.includes('section')) ? section.name.slice(0, -12) : section.name;
                        const style = getBackgroundColor(index)
                        if (index === 11) {
                            return (
                                <>
                                    <h2>{concentration.name+ ' Requirements'}</h2>
                                    <button style={style} onClick={() => handleClick(index)} key={section.name+index}>{sectionTitle}</button>
                                </>
                            )
                        }
                        return <button style={style} onClick={() => handleClick(index)} key={section.name+index}>{sectionTitle}</button>
                    })
                }
                
            </div>
        )
    }
       
    //<button className='selection-button' onClick={handleSelectionClick}>{selectionName}</button>
    return (
        <div className='selection-container'>
            {
                renderSelectionBar()
            }
            
            <div className='section-bar'>
                    {
                        renderSection(current)
                    }
            </div>
        </div>
    )
}

export default SelectionBar;