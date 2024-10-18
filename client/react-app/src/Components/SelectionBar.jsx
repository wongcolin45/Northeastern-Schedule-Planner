import {useState, useContext} from 'react';
import { MyContext } from '../App';
import PropTypes from 'prop-types';
import {getCompentenciesCompleted} from "../Helpers/converter.jsx";
import CourseButton from './CourseButton';

function SelectionBar(props) {
    const {concentration, courseSelections, concentrationSelections, path} = useContext(MyContext);

    const sections = courseSelections.concat(concentrationSelections);

    const [current, setCurrent] = useState(0);

    const [pathClicked, setPathClicked] = useState(false);

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

    function renderSection(index) {
    
        if (pathClicked) {
            return renderNUPathSection();
        }

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
                    section.courses.map((course,index) => {
                       return <CourseButton course={course} key={index}/>
                    })
                }
                </div>
               
            </div>
        )
    }

    function renderNUPathSection() {
        const completed = getCompentenciesCompleted(path)
        const style = getNUPathBackgroundColor(completed);
        return (
            <div style={style} className='nupath-selection-container'>
                <h1>NU Path Requirements</h1>
                <div className='nupath-contents-container'>
                {
                    Object.entries(path).map(([key, value]) => {
                        return (
                            <div key={key+value} className='attribute-container'>
                                <h3>{key}</h3>
                                <ul>
                                {
                                    [...value].map(((course, index) => {
                                        return <li key={index}>{course}</li>
                                    }))
                                }
                                </ul>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    const handleClick = (index) => {
        setPathClicked(false);
        setCurrent(index);
    }

    function getBackgroundColor(index) {
       
        const left = getLeft(index);
        if (left === sections[index].left) {
            return {backgroundColor: '#E0E0E0'}
        }else if (left > 0) {
            return {backgroundColor: '#F5E6CC'}
        }else {
            return {backgroundColor: '#A3D9B1'}
        }
    }

    function renderSectionSelections(section, index) {
        const sectionTitle = (section.name.includes('section')) ? section.name.slice(0, -12) : section.name;
        const style = getBackgroundColor(index)
        const arrow = (current === index) ? "*" : "";
        
        if (index === 11) {
            return (
                <>
                    <h2 key={index}>{concentration.name+ ' Requirements'}</h2>
                    <button style={style} 
                            onClick={() => handleClick(index)} 
                            key={section.name+index}
                            className='selection-bar-button'
                            >{arrow + ' '+ sectionTitle}</button>
                </>
            )
        }
        return (
            <button style={style} 
                        onClick={() => handleClick(index)} 
                        key={section.name+index}
                        className='selection-bar-button'
                        >{arrow + ' ' + sectionTitle}</button>
        )      
    }

    function getNUPathBackgroundColor(left) {
        if (left === 11) {
            return {backgroundColor: '#A3D9B1'}
        }else if (left > 0) {
            return {backgroundColor: '#F5E6CC'}
        }else {
            return {backgroundColor: '#E0E0E0'}
        }
    }

    function renderSelectionBar() {
        const compentenciesCompleted = getCompentenciesCompleted(path);
        const title = `${compentenciesCompleted}/11 Completed`;

        const style = getNUPathBackgroundColor(compentenciesCompleted);

        return (
            <div className='requirements-bar'>
                <h2>Computer Science Requirements</h2>
                {   
                    sections.map((section, index) => {
                        return renderSectionSelections(section, index)
                    })
                }
                <h2>NU Path Requirements</h2>
                <button style={style} onClick={() => setPathClicked(p => !p)}>{title}</button>
            </div>
        )
    }

       
    return (
        <div className='selection-container' >
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

SelectionBar.propTypes = {
    courseTaken: PropTypes.func.isRequired,
    courseSelection: PropTypes.object,
    setCourseSelection: PropTypes.func.isRequired,
}