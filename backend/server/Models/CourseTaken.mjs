
import { Model, DataTypes } from 'sequelize';
import { Course } from './Course.mjs';

import sequelize from '../Configuration/connection.mjs';


class CourseTaken extends Model {}

CourseTaken.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        courseID: {
            type: DataTypes.INTEGER,
            field: 'course_id',
            references: {
                model: Course,
                key: 'courseID'
            }
        },
        userID: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            references: {
                model: User,
                key: 'user_id'
            }
        }


    },
    { sequelize, tableName: 'courses_taken', timestamps: false}
    
)

export {CourseTaken}



