import {useContext, useEffect, useState} from 'react';
import {MyContext} from '../App';
import CourseButton from './CourseButton';
import Loader from "./Loader.jsx";
import {ScheduleContext} from "../Pages/ScheduleMaker.jsx";
import NUPathView from "./NUPathView.jsx";
import NUPathButton from "./NUPathButton.jsx";

/**
 * This represents the top portion of the Schedule Page.
 * It includes the sidebar and region of selecting courses to place in the schedule area below.
 */
function SelectionBar() {

    const {schedule} = useContext(ScheduleContext);

    const {concentration, courseSelections, concentrationSelections} = useContext(MyContext);

    const [pathCount, setPathCount] = useState(schedule.getNUPathCount());

    useEffect(() => {
        setPathCount(schedule.getNUPathCount());
    },[schedule])

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
    
    function coursesTaken(index) {
        const section = sections[index];
        let count = 0;
        section.courses.forEach(course => {
            if (schedule.courseTaken(course.courseCode)) {
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
            return <NUPathView style={getStyle(pathCount, 11)}/>
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
        const left = getLeft(index);
        const needed = sections[index].left;
        const completed = needed - left;
        const style = getStyle(completed, needed);

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

    const handleClick = (index) => {
        setPathClicked(false);
        setCurrent(index);
    }

    function getStyle(completed, needed) {
        if (completed === 0) {
            return {backgroundColor: '#2A2B32', color: 'whitesmoke'};
        }else if (completed < needed) {
            return {backgroundColor: '#F5E6CC', color: 'black'}
        }
        return {backgroundColor: '#A3D9B1', color: 'black'}
    }

    function renderSectionSelections(section, index) {
        const sectionTitle = (section.name.includes('section')) ? section.name.slice(0, -12) : section.name;
        const left = getLeft(index);
        const needed = sections[index].left;
        const completed = needed - left;
        let style = getStyle(completed, needed);
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

    function renderSelectionBar() {
        if (sections.length === 0) {
            return <></>;
        }
        let style = getStyle(pathCount, 11)
        if (style.color === 'whitesmoke') {
            style = {backgroundColor: 'whitesmoke', color: 'black'};
        }


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
                {/*<button id='nupath-button'*/}
                {/*        style={style}*/}
                {/*        onClick={handleNUPathClick}>{title}</button>*/}
                <NUPathButton setPathClicked={setPathClicked}
                              style={style}/>

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

