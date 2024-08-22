import React, {useState, useEffect, useContext} from 'react';
import CourseButton from './CourseButton.jsx';
import Section from './Section.jsx';
import { MyContext } from '../App.jsx';

function Requirements(props) {

    const {outline} = useContext(MyContext);


    function renderRequirement(requirement, index) {
        if (outline == undefined){
            console.log('outline not initialized');
            return <h1>Outline not initialized</h1>
        }

        const sections = requirement.subsections;
        return (
            <div key={requirement+index} className="requirement-container">
                <h1>{requirement.name}</h1>
                {sections.map((section, index) => {
                    return <Section section={section} 
                                    key={section.name+index} 
                                    requirementName={requirement.name}
                                    />
                })}
            </div>
        )
    }

    return (
        <div>
            {
                outline.map((requirement, index) => renderRequirement(requirement, index))
            }
        </div>
    )
}

export default Requirements;