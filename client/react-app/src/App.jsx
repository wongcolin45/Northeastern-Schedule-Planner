
import {useState, useEffect,createContext} from 'react';



import ScheduleMaker from './Pages/ScheduleMaker';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { fetchConcentration } from './API/courseRequirementsAPI';
import Settings from "./Pages/Settings.jsx";
import Home from "./Pages/Home.jsx";
import TransferCredit from "./Pages/TransferCredit.jsx";
import Login from "./Pages/Login.jsx";




export const MyContext = createContext();

function App() {

  const [outline, setOutline] = useState([]);

  const [startYear, setStartYear] = useState(2024);

  const [concentration, setConcentration] = useState({name: "Artificial Intelligence", tag: 'ai'});

  const [courseSelections, setCourseSelections] = useState([]);

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

  const saveData = false;

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
        console.log('outline check');
        console.log(outline);
        const requirements = [];
        outline.forEach(r => {
            r.sections.forEach(s => {
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
                                        saveData

            }}>
              <ScheduleMaker/>
            </MyContext.Provider>
        }></Route>

          <Route path="/transfer-credit" element={
              <MyContext.Provider value={{path, setPath}}>
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





