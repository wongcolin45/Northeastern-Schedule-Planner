import {Course} from "../Models/Course.mjs";
import {APCredit} from "../Models/APCredit.mjs";
import getCourseById from "./coursesRepository.mjs";

Course.hasMany(APCredit, { foreignKey: 'courseID', as: 'transferCredit' });
APCredit.belongsTo(Course, { foreignKey: 'courseID', as: 'course' });


async function getAPCourses() {
    try {
        const data = await APCredit.findAll({
            attributes: [
                ['ap_course_name', 'name'],
                ['attributes', 'attributes'],
                ['course_id', 'courseID']
            ]
        });

        const courses = await Promise.all(data.map(async r => {
            const {name, attributes, courseID} = r.dataValues;
            const courseMatch = (courseID !== null) ? await getCourseById(courseID) : null;
            return {'name': name, 'attributes': attributes, 'courseMatch': courseMatch};
        }));
        return courses;
    } catch (error) {
        console.log('Error fetching requirements:', error);
        throw error
    }
}


await getAPCourses();


export {getAPCourses};
