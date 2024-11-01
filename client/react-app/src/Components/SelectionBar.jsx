import {useState, useContext} from 'react';
import { MyContext } from '../App';
import PropTypes from 'prop-types';
import {getCompetenciesCompleted} from "../Helpers/converter.jsx";
import CourseButton from './CourseButton';
import Loader from "./Loader.jsx";

/**
 * This represents the top portion of the Schedule Page.
 * It includes the sidebar and region of selecting courses to place in the schedule area below.
 */
function SelectionBar(props) {


    const {concentration, courseSelections, concentrationSelections, path} = useContext(MyContext);

    /**
     * Adds the Major + concentration requirements into one.
     */
    const sections = courseSelections.concat(concentrationSelections);

    /**
     * Keep track of the current requirement section's index.
     */
    const [current, setCurrent] = useState(0);

    /**
     * Keeps track if the NU path section was clicked or not.
     */
    const [pathClicked, setPathClicked] = useState(false);

    /**
     * Gets the number of courses taken for the section.
     * @param index the index of the section
     * @returns {number} the number of courses taken
     */
    function coursesTaken(index) {
        const section = sections[index];
        let count = 0;
        section.courses.forEach(course => {
            if (props.courseTaken(course.courseCode)) {
                count++;
            }
        })
        return count;
    }

    /**
     * Gets how many course left in order to complete section.
     * @param index the index of the section
     * @returns {number} the number of courses left
     */
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

        if (sections[index] === undefined || sections === undefined) {
            return (
                <div className='course-selection-container' style={{'height' : '5%','textAlign': 'center'}}>

                    <Loader/>
                    <h3>{'hold up, waiting on backend...'}</h3>
                </div>
            )
        }
        const section = sections[index];


        const sectionTitle = (section.name.includes('section')) ? section.name.slice(0, -12) : section.name;
        const style = getBackgroundColor(index);

        const left = getLeft(index);

        const message = (left <= 0) ? 'Complete' : `${left } left`;

        return (
            <div className='course-selection-container' style={style}>
                <h1>{`${sectionTitle} (${message})`}</h1>
                <div className='courses-container' style={style}>
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
        const completed = getCompetenciesCompleted(path)
        const style = getNUPathBackgroundColor(completed);
        return (
            <div style={style} className='nupath-selection-container'>
                <h1 style = {style} >NU Path Requirements</h1>
                <div style={style} className='nupath-contents-container'>
                {
                    Object.entries(path).map(([key, value]) => {
                        const check = (value.size >= 1) ? " ✔" : '';
                        return (
                            <div key={key+value} className='attribute-container'>
                                <h3>{key + check}</h3>
                                <ul key={key+check+value}>
                                {
                                    [...value].map(((course, index) => {
                                        return <li key={course+index}>{course}</li>
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

    /**
     * Handles when a button on the sidebar is clicked.
     * Sets the current section to the corresponding button that was pressed.
     * @param index the index of the button - corresponds to its section
     */
    const handleClick = (index) => {
        setPathClicked(false);
        setCurrent(index);
    }

    function getBackgroundColor(index) {
        const left = getLeft(index);
        if (left === sections[index].left) {
            return {backgroundColor: '#2A2B32', color: 'whitesmoke'};
        }else if (left > 0) {
            return {backgroundColor: '#F5E6CC', color: 'black'}
        }else {
            return {backgroundColor: '#A3D9B1', color: 'black'}
        }
    }

    function renderSectionSelections(section, index) {
        const sectionTitle = (section.name.includes('section')) ? section.name.slice(0, -12) : section.name;
        let style = getBackgroundColor(index)
        if (style.color === 'whitesmoke') {
            style = {backgroundColor: 'whitesmoke', color: 'black'};
        }
        if (current === index) {
            style = {...style, opacity: '0.7'};
        }
        if (index === 12) {
            return (
                <>
                    <h2 key={index}>{concentration.name+ ' Requirements'}</h2>
                    <button style={style} 
                            onClick={() => handleClick(index)} 
                            key={section.name+index}
                            className='selection-bar-button'
                            >{sectionTitle}</button>
                </>
            )
        }



        return (
            <>
                <button style={style}
                            onClick={() => handleClick(index)}
                            key={section.name+index}
                            className='selection-bar-button'
                            >{sectionTitle}</button>
            </>
        )      
    }

    function getNUPathBackgroundColor(left) {
        if (left === 0) {
            return {backgroundColor: '', color: 'whitesmoke'};
        }else if (left < 11) {
            return {backgroundColor: '#F5E6CC', color: 'black'}
        }else {
            return {backgroundColor: '#A3D9B1', color: 'black'}
        }





    }

    function renderSelectionBar() {
        if (sections.length === 0) {
            return <></>;
        }
        const count = getCompetenciesCompleted(path);
        const title = `${count}/11 Completed`;
        const style = getNUPathBackgroundColor(count);

        let currentRequirement = sections[0].requirementName;

        function renderRequirementName(section) {
            if (section.requirementName !== currentRequirement) {
                currentRequirement = section.requirementName;
                return <h2>{currentRequirement}</h2>
            }
        }

        return (
            <div className='requirements-bar' key={'requirements-bar'}>
                <h2>{currentRequirement}</h2>
                {   
                    sections.map((section, index) => {
                        return (
                            <>
                                {renderRequirementName(section)}
                                {renderSectionSelections(section, index)}
                            </>
                        )
                    })
                }
                <h2>NU Path Requirements</h2>
                <button id='nupath-button' style={style} onClick={() => setPathClicked(p => !p)}>{title}</button>
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