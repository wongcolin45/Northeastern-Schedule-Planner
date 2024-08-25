
import React, {useState, useEffect,createContext} from 'react';
import RequirementsHub from './Pages/RequirementsHub';

import Home from './Pages/Home';
import ScheduleMaker from './Pages/ScheduleMaker';
import Settings from './Pages/Settings';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { fetchConcentration } from './API/courseRequirementsAPI';



export const MyContext = createContext();

function App() {
  const [courses, setCourses] = useState([]);

  const [outline, setOutline] = useState([]);

  const [startYear, setStartYear] = useState(2024);

  const [concentration, setConcentration] = useState({name: "Artificial Inteligence", tag: 'ai'});

  const [courseSelections, setCourseSelections] = useState([]);

  const [concentrationSelections, setConcentrationSelections] = useState([]);

  const [sections, setSections] = useState([]);

  function printCourses(courses) { 
  }

  function courseTaken(courseInfo) {
    return courses.some(c => {
      return c.courseCode === courseInfo.courseCode &&
             c.requirementName === courseInfo.requirementName &&
             c.sectionName === courseInfo.sectionName;
    })
  }

  useEffect(() => {    
    async function fetchRequirements() {
        const url = 'http://localhost:3000/api/requirements';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setOutline(data);
            

        }catch(error) {
            console.log(`Error fetching data ${error}`);
        }
    }
    fetchRequirements();
  },[]);

  useEffect(() => {
   
    if (outline.length > 0) {
      const requirements = [];
      outline.forEach(r => {
  
        r.subsections.forEach(s => {
          
          const info = {name: s.name, courses: s.courses, left: s.coursesRequired,};
           
          requirements.push(info);
        });
      });
      setCourseSelections(requirements);
      
      
    }
  },[outline])

  useEffect(() => {
    const fetchSelections = async () => {
      
      const data = await fetchConcentration(concentration);
      const newConcentrationSelections = []
   
      data.sections.forEach(s => {
        newConcentrationSelections.push({name: s.name, courses: s.courses, left: s.coursesRequired})
      
      });

      setConcentrationSelections(newConcentrationSelections);
    }
    fetchSelections();

  },[]);


  
  

  return (
    <BrowserRouter>
      <Routes>

          
        <Route path="/requirementshub" 
              element=
              {<MyContext.Provider value={{courses:courses, setCourses: setCourses, printCourses: printCourses, courseTaken: courseTaken,
                                           outline: outline, setOutline,
                                           concentration: concentration,setConcentration: setConcentration,
                                           sections: sections, setSections: setSections,
                                           }}>
                <RequirementsHub/>
              </MyContext.Provider>
              }></Route>

        <Route path="/home" element={<Home/>}></Route>


        <Route path="/schedulemaker" element={
            <MyContext.Provider value={{outline: outline,
                                        courseSelections: courseSelections, setCourseSelections: setCourseSelections,
                                        concentration: concentration,
                                        concentrationSelections: concentrationSelections,
                                        startYear: startYear
            }}>
              <ScheduleMaker/>
            </MyContext.Provider>
        }></Route>

        <Route path="/login" element={
          <MyContext.Provider value={{concentration: concentration, setConcentration: setConcentration,
                                      startYear: startYear, setStartYear: setStartYear}}>
             <Settings/>
          </MyContext.Provider>
        }></Route>

        

      </Routes>
    </BrowserRouter>
  )

  
}

export default App;





