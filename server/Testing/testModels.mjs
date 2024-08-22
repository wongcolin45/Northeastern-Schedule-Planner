import sequelize from "../Configuration/connection.mjs";
import { Course } from "../Models/Course.mjs";
import { CSCore } from "../Models/CSCore.mjs";
import { Sequelize } from "sequelize";


sequelize.sync()
  .then(() => {
    console.log('Database synchronized (no changes to existing tables)');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
});




async function getRequirements() {
    try {
      let requirements = await CSCore.findAll({
        attributes: [ 
          [Sequelize.fn('DISTINCT', Sequelize.col('requirement_Name')), 'requirementName']
        ]
      });
      requirements = requirements.map(r => r.requirementName);
      return requirements;
    } catch (error) {
      console.error('Error fetching requirements:', error);
      return []
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
        return [];
    }
}




const getAllCourses = async () => {
    try {
        // Retrieve all course records
        const courses = await CSCore.findAll();

        // Check if the result is an instance of Course
        console.log(courses.every(course => course instanceof CSCore)); // Should be true if all are instances

        // Print details of each course
        courses.forEach(course => {
            console.log(course.toJSON()); // Converts the course instance to a plain object
        });

    } catch (error) {
        console.error('Error retrieving courses:', error);
    }
}





async function main() {
    const requirements = await getRequirements();
    for (let i = 0; i < requirements.length; i++) {
        const requirement = requirements[i]
        const subRequirements = await getSubRequirements(requirement);
        console.log(subRequirements);
    }
}

main();








