
import {useState, useEffect,createContext} from 'react';



import ScheduleMaker from './Pages/ScheduleMaker';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { fetchConcentration } from './API/requirementsAPI.js';
import Settings from "./Pages/Settings.jsx";
import Home from "./Pages/Home.jsx";
import TransferCredit from "./Pages/TransferCredit.jsx";
import Login from "./Pages/Login.jsx";

import {fetchRequirements} from "./API/requirementsAPI.js";
import Schedule from "./utils/Schedule.js";


export const MyContext = createContext();

const start = new Schedule(2024);

/**
 * This is the main app component.
 */
function App() {
    /**
     * This store the main outline of major requirements.
     */
    const [outline, setOutline] = useState([]);

    const [schedule, setSchedule] = useState(start);

    /**
     * This is the start year when the user started college.
     */
    const [startYear, setStartYear] = useState(2024);

    /**
     * This represents the user's chosen concentration
     */
    const [concentration, setConcentration] = useState({name: "Artificial Intelligence", tag: 'ai'});

    /**
     * This store the major requirement sections along with the courses need to fulfill them.
     */
    const [courseSelections, setCourseSelections] = useState([]);

    /**
     * This stores the concentration requirement sections along with the courses need to fulfill them.
     */
    const [concentrationSelections, setConcentrationSelections] = useState([]);

    const [path, setPath] = useState({
    "Engaging with the Natural and Designed World": new Set(),
    "Exploring Creative Expression and Innovation": new Set(),
    "Interpreting Culture": new Set(),
    "Conducting Formal and Quantitative Reasoning": new Set(),
    "Understanding Societies and Institutions": new Set(),
    "Analyzing and Using Data": new Set(),
    "Engaging Differences and Diversity": new Set(),
    "Employing Ethical Reasoning": new Set(),
    "Writing Across Audiences and Genres": new Set(),
    "Integrating Knowledge and Skills Through Experience": new Set(),
    "Demonstrating Thought and Action in a Capstone": new Set()
  });

    const [apCourses, setAPCourses] = useState(loadAPCourses());

    const [coops, setCoops] = useState([]);

    const saveData = false;

    function loadAPCourses() {
        const savedCourses = localStorage.getItem('apCourses');
        if (savedCourses) {
            return JSON.parse(savedCourses);
        }
        return [];
    }


    useEffect(() => {
        fetchRequirements()
        .then(data => {
            setOutline(data)
    });
    },[]);

    useEffect(() => {
        if (outline.length > 0) {
            const requirements = [];
            outline.forEach(r => {
                r.sections.forEach(s => {
                    const info = {requirementName: r.name, name: s.name, courses: s.courses, left: s.coursesRequired,};
                    requirements.push(info);
                });
          });
          setCourseSelections(requirements);
        }
    },[outline])

    useEffect(() => {
        localStorage.setItem('apCourses', JSON.stringify(apCourses));
    },[apCourses])

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

    useEffect(() => {
        setPath(prev => {
            const newPath = {...prev};
            coops.forEach(coop => {
                newPath["Integrating Knowledge and Skills Through Experience"].add(coop);
            })
            return newPath;

        })
    }, [coops]);


  
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <Home/>
          }>
          </Route>

          <Route path="/Home" element={
              <Home/>
          }>
          </Route>
        <Route path="/schedule" element={
            <MyContext.Provider value={{outline,
                                        courseSelections,
                                        setCourseSelections,
                                        concentration,
                                        concentrationSelections,
                                        startYear,
                                        path,
                                        setPath,
                                        saveData,
                                        apCourses,
                                        setCoops,
                                        schedule, setSchedule,
            }}>
              <ScheduleMaker/>
            </MyContext.Provider>
        }></Route>

          <Route path="/transfer-credit" element={
              <MyContext.Provider value={{path, setPath, apCourses, setAPCourses, schedule, setSchedule}}>
                  <TransferCredit/>
              </MyContext.Provider>

          }>
          </Route>

        <Route path="/settings" element={
          <MyContext.Provider value={{concentration, setConcentration,
                                      startYear, setStartYear, saveData}}>
             <Settings/>
          </MyContext.Provider>
        }></Route>

        <Route path="/Login" element={
          <Login/>
        }>
        </Route>

      </Routes>
    </BrowserRouter>
    )

  
}

export default App;





