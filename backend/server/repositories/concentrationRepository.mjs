import sequelize from "../Configuration/connection.mjs";
import {Course} from "../Models/Course.mjs";
import {Sequelize} from "sequelize";
import getCourseById from "./coursesRepository.mjs";

import {
    AIConcentration,
    FoundationsConcentration,
    HCCConcentration,
    SoftwareConcentration,
    SystemsConcentration
} from '../Models/CSConcentration.mjs';

//===============================================================
//              Get Concentration Requirements
//===============================================================

const Models = [AIConcentration, HCCConcentration, SoftwareConcentration, SystemsConcentration, FoundationsConcentration];


Models.forEach((Model, index) => {
    Course.hasMany(Model, { foreignKey: 'courseID', as: `${Model.tableName}` });
    Model.belongsTo(Course, { foreignKey: 'courseID', as: `course-${Model.tableName}` });
});

/**=========================
 * Helper Methods
 *=========================/

/**
 * Gets the section requirement names
 * @param Model the concentration model to use
 * @returns {Promise<String[]>}
 */
async function getSections(Model) {
    try {
        const data = await Model.findAll({
        attributes: [ 
          [Sequelize.fn('DISTINCT', Sequelize.col('section_requirement')), 'sectionRequirement']
        ]
      });
        return data.map(r => r.sectionRequirement);
    } catch (error) {
      console.log('Error fetching requirements:', error);
      throw error
    }
}

/**
 * Get the courses for the given section requirement
 * @param Model the concentration model
 * @param section the section requirement name
 * @returns {Promise<Awaited<{courseCode: string, prerequisite: string, className: string, attributes: string, mandatory: boolean}>[]>}
 */
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
                        [sequelize.col('attributes'), 'attributes'],
                        [sequelize.col('prerequisite'), 'prerequisite']
                    ]
                }
        ],
        where: {
            sectionRequirement: section
        }
      });
      const courses = await Promise.all(data.map(async r => {
          const alias = `course-${Model.tableName}`
          const mandatory = (r.mandatory === undefined) ? false : r.mandatory === 1;
          const courseName = r[alias].courseName
          const courseCode = r[alias].department + r[alias].courseNumber;
          const attributes = r[alias].dataValues.attributes;
          const prerequisite = await getCourseById([alias].prerequisite);
          const courseInfo = {
              className: courseName,
              courseCode: courseCode,
              mandatory: mandatory,
              attributes: attributes,
              prerequisite: prerequisite
          }
          return courseInfo;
      }));
      return courses
    } catch (error) {
      throw error
    }
}

/**
 * Gets the number of courses required
 * @param description
 * @returns {number}
 */
const getCoursesRequired = (description) => (description.includes('both') || description.includes('two')) ? 2 : 1;

/**
 * Given the tag - represent the concentration,
 * get the model that represent the concentration
 * @param tag the tag alias for the concentration name
 * @returns {Object} the model linked to the concentration data
 */
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

/**
 * Gets the name of the concentration.
 * @param tag the alias of the name
 * @returns {string} the concentration name
 */
function getConcentrationName(tag) {
  if (tag.length === 2) 
    return "Artificial Intelligence";
  else if (tag.length ===3)
    return "Human Centered Computing";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}



/**=========================
 * Main Method
 *=========================/

/**
 * Gets the outline of the given concentration requirements.
 * @param tag the alias of the concentration
 * @returns {Promise<{name: string, sections: Object[]}>}
 */
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



export default getConcentration;