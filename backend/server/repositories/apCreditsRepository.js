import {Course} from "../Models/Course.mjs";
import {APCredit} from "../Models/APCredit.mjs";
import getCourseById from "./coursesRepository.mjs";

Course.hasMany(APCredit, { foreignKey: 'courseID', as: 'transferCredit' });
APCredit.belongsTo(Course, { foreignKey: 'courseID', as: 'course' });


/**
 * Gets the AP courses objects with their name, attributes, and equivalent nu course.
 * @returns {Promise<{name: String, attributes: String, courseMatch: null|string}[]>}
 */
async function getAPCourses() {
    try {
        const data = await APCredit.findAll({
            attributes: [
                ['ap_course_name', 'name'],
                ['attributes', 'attributes'],
                ['course_id', 'courseID']
            ]
        });
        return await Promise.all(data.map(async r => {
            const {name, attributes, courseID} = r.dataValues;
            const courseMatch = (courseID !== null) ? await getCourseById(courseID) : null;
            return {'name': name, 'attributes': attributes, 'courseMatch': courseMatch};
        }));
    } catch (error) {
        console.log('Error fetching requirements:', error);
        throw error
    }
}


export {getAPCourses};
