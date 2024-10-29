import {Course} from "../Models/Course.mjs";
import sequelize from "../Configuration/connection.mjs";


async function getCourseById(courseID) {
    if (courseID == null) {
        return null;
    }
    try {
        const data = await Course.findOne({
            attributes: [
                [sequelize.col('department'), 'department'],
                [sequelize.col('course_number'), 'courseNumber'],

            ],
            where: {
                courseID: courseID
            }
        })
        const {department, courseNumber}  = data.dataValues;
        return department + ' ' + courseNumber;
    } catch (error) {
        throw error;
    }
}

export default getCourseById;