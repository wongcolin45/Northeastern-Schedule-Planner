
import {useState, useEffect,createContext} from 'react';



import ScheduleMaker from './Pages/ScheduleMaker';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { fetchConcentration } from './API/courseRequirementsAPI';




export const MyContext = createContext();

function App() {

  const [outline, setOutline] = useState([]);

  const [startYear, setStartYear] = useState(2024);

  const [concentration, setConcentration] = useState({name: "Artificial Inteligence", tag: 'ai'});

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
            console.log(data);
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
            <MyContext.Provider value={{outline,
                                        courseSelections,
                                        setCourseSelections,
                                        concentration,
                                        concentrationSelections,
                                        startYear,
                                        path,
                                        setPath

            }}>
              <ScheduleMaker/>
            </MyContext.Provider>
        }></Route>

        {/* <Route path="/login" element={
          <MyContext.Provider value={{concentration: concentration, setConcentration: setConcentration,
                                      startYear: startYear, setStartYear: setStartYear}}>
             <Settings/>
          </MyContext.Provider>
        }></Route>

         */}

      </Routes>
    </BrowserRouter>
  )

  
}

export default App;





