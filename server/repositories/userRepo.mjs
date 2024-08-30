import { User } from "../Models/User.mjs";
import { CourseTaken } from "../Models/CourseTaken.mjs";
import { Course } from "../Models/Course.mjs";
import { Sequelize } from "sequelize";


User.hasMany(CourseTaken, { foreignKey: 'userId' });
CourseTaken.belongsTo(User, { foreignKey: 'userId' });

Course.hasMany(CourseTaken, { foreignKey: 'courseId' });
CourseTaken.belongsTo(Course, { foreignKey: 'courseId' });


async function getCourseID(department, code) {
    Course.findOne({
        attributes: ['courseID'],
        where: {
            department: department,
            courseNumber: code
        }
            
    })
}

