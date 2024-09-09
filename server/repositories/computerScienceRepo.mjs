import sequelize from "../Configuration/connection.mjs";
import { Course } from "../Models/Course.mjs";
import { CSCore } from "../Models/CSCore.mjs";
import { Sequelize } from "sequelize";


Course.hasMany(CSCore, { foreignKey: 'courseID', as: 'requirements' });
CSCore.belongsTo(Course, { foreignKey: 'courseID', as: 'course' });


//===============================================================
//                     Get Core Requirements
//===============================================================

async function getRequirements() {
    
    try {
        const data = await CSCore.findAll({
        attributes: [ 
          [Sequelize.fn('DISTINCT', Sequelize.col('requirement_name')), 'requirementName']
        ]
      });
      const requirements = data.map(r => r.requirementName);
      return requirements;
    } catch (error) {
      console.log('Error fetching requirements:', error);
      throw error
    }
}

async function getSubRequirements(requirement) {
    try {
        let subRequirements = await CSCore.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('sub_requirement_name')), 'subRequirementName']
            ],
            where: {
                requirementName: requirement
            }
        });
        subRequirements = subRequirements.map(s => s.subRequirementName);
        return subRequirements;
    }catch (error) {
        console.error('Error fetching subrequirements', error);
        throw error;
    }
}

async function getCourses(requirement, subRequirement) {
    try {
        const data = await CSCore.findAll({ 
            attributes: [
                [sequelize.col('must_take'), 'mandatory']
            ],
            include: [
                {
                    model: Course,
                    as: 'course',  // This should match the alias used in the association definition
                    attributes: [
                        [sequelize.col('course_name'), 'courseName'],
                        [sequelize.col('department'), 'department'],
                        [sequelize.col('course_number'), 'courseNumber'],     
                        [sequelize.col('attributes'), 'attributes'], 
                    ]
                }
            ],
            where: {
                requirementName: requirement,
                subRequirementName: subRequirement
            }
        });
        const courses = data.map(element => {
            const d = element.get({plain: true});
            const courseName = d.course.courseName;
            const mandatory = d.mandatory === 1;
            const courseCode = d.course.department + ' ' + d.course.courseNumber;
            const attributes = (d.course.attributes) ? d.course.attributes : null;
            const courseInfo = {className: courseName, mandatory: mandatory, courseCode: courseCode, attributes: attributes}
            return courseInfo;
        });
        return courses;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getCoursesRequired(requirement, subRequirement) {
    try {
        const data = await CSCore.findOne({
            attributes: [
                [sequelize.col('courses_required'), 'coursesRequired']
            ],
            where: {
                requirementName: requirement,
                subRequirementName: subRequirement
            }
        })
        return data.coursesRequired;
    }catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getCSCore() {
    const outline = [];

    const requirements = await getRequirements();

    for (const requirement of requirements) {

        const subRequirements = await getSubRequirements(requirement);

        const sections = [];

        for (const subRequirement of subRequirements) {

            
            const courses = await getCourses(requirement, subRequirement);

            const coursesRequired = await getCoursesRequired(requirement, subRequirement);

            const section = {name: subRequirement, courses: courses, coursesRequired: coursesRequired}

            sections.push(section); 
            
        }
        outline.push({name: requirement, sections: sections})
    }

    return outline
}

export default getCSCore;











