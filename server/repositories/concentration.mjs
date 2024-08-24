import sequelize from "../Configuration/connection.mjs";
import { Course } from "../Models/Course.mjs";
import { CSCore } from "../Models/CSCore.mjs";
import { Sequelize } from "sequelize";

import { AIConcentration, 
         HCCConcentration, 
         SoftwareConcentration, 
         SystemsConcentration, 
         FoundationsConcentration } 
from '../Models/CSConcentration.mjs';

//===============================================================
//              Get Concentration Requirements
//===============================================================

const Models = [AIConcentration, HCCConcentration, SoftwareConcentration, SystemsConcentration, FoundationsConcentration];

Models.forEach((Model) => console.log(Model.tableName));



Models.forEach((Model, index) => {
    console.log(`Alais is ${index}`);
    Course.hasMany(Model, { foreignKey: 'courseID', as: `${Model.tableName}` });
    Model.belongsTo(Course, { foreignKey: 'courseID', as: `course-${Model.tableName}` });
});


async function getSections(Model) {
    console.log('===========GET SECTION===========');
    try {
        const data = await Model.findAll({
        attributes: [ 
          [Sequelize.fn('DISTINCT', Sequelize.col('section_requirement')), 'sectionRequirement']
        ]
      });
      const sections = data.map(r => r.sectionRequirement);
      return sections;
    } catch (error) {
      console.log('Error fetching requirements:', error);
      throw error
    }
}

async function getCourses(Model, section) {
  
    try {
        const data = await Model.findAll({
        attributes: [
            [sequelize.col('must_take'), 'mandatory'],
        ],
        include: [
                {
                    model: Course,
                    as: `course-${Model.tableName}`,  
                    attributes: [
                        [sequelize.col('course_name'), 'courseName'],
                        [sequelize.col('department'), 'department'],
                        [sequelize.col('course_number'), 'courseNumber'],     
                    ]
                }
        ],
        where: {
            sectionRequirement: section
        }
      });
      const courses = data.map(r => {
      
        const alias = `course-${Model.tableName}`
      
        const mandatory = (r.mandatory === undefined) ? false : r.mandatory === 1;
        const courseName = r[alias].courseName
        const courseCode = r[alias].department + r[alias].courseNumber;
        return {className: courseName, courseCode: courseCode, mandatory: mandatory}
      });
      return courses
    } catch (error) {
      console.log('Error fetching requirements:', error);
      throw error
    }
}


const getCoursesRequired = (description) => (description.includes('both') || description.includes('two')) ? 2 : 1;


function getModel(tag) {
  if (tag === "ai")
    return Models[0]
  else if (tag === "hcc")
    return Models[1]
  else if (tag === "software")
    return Models[2]
  else if (tag === "systems")
    return Models[3]
  return Models[4]
}

function getConcentrationName(tag) {
  console.log('============ GOT a tag of '+ tag+ '================');
  if (tag.length === 2) 
    return "Artificial Inteligence";
  else if (tag.length ===3)
    return "Human Centered Computing";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

async function getConcentration(tag) {

  const Model = getModel(tag);
  const name = getConcentrationName(tag);
  const concentration = {name: name, sections: []};
  const sections = await getSections(Model);
  for (const section of sections) {
 
    const courses = await getCourses(Model, section);
    const coursesRequired = getCoursesRequired(section);
    concentration.sections.push({name: section, courses: courses, coursesRequired: coursesRequired});
  }
  return concentration;
}

async function main() {
    const tag = "ai";
    const c = await getConcentration(tag);
    console.log(c);
}

//main();


export default getConcentration;