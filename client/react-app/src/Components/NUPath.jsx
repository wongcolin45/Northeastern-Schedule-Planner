import React, {useContext, useEffect, useState} from 'react';
import { MyContext } from '../App';
import { fetchNUPath } from '../API/courseRequirementsAPI';

const requirements = ['Engaging with the Natural and Designed World',
                      'Exploring Creative Expression and Innovation',
                      'Interpreting Culture',
                      'Conducting Formal and Quantitative Reasoning',
                      'Understanding Societies and Institutions',
                      'Analyzing and Using Data',
                      'Engaging Differences and Diversity',
                      'Employing Ethical Reasoning',
                      'Writing Across Audiences and Genres',
                      'Integrating Knowledge and Skills Through Experience',
                      'Demonstrating Thought and Action in a Capstone'];


function NUPath() {
    const [outline, setOutline] = useState([]);
    const {courses} = useContext(MyContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNUPath(courses);
                setOutline(data); // Set the outline with the fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        //console.log('Outline Check ')
        //console.log(outline);
      
    }, [courses])

    return (
        <>
            <h1>NUpath Requirements</h1>
            <div className="nupath-section-container">
                <h2>11 Relevant Disciples</h2>
                {
                    
                    outline.map(requirement => {
                        console.log('requiremnt check')
                        console.log(requirement)
                        return <button>requirement</button>
                    })
                }
            </div>
        </>
    )
}

export default NUPath;