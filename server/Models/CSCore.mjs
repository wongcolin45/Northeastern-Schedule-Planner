
import { Model, DataTypes } from 'sequelize';
import { Course } from './Course.mjs';

import sequelize from '../Configuration/connection.mjs';


class CSCore extends Model {}

CSCore.init(
    {
        requirementID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'requirement_id'
        },
        requirementName: {
            type: DataTypes.TEXT,
            field: 'requirement_name'
        },
        subRequirementName: {
            type: DataTypes.TEXT,
            field: 'sub_requirement_name'
        },
        coursesRequired: {
            type: DataTypes.INTEGER,
            field: 'courses_required'
        },
        courseID: {
            type: DataTypes.INTEGER,
            field: 'course_id',
            references: {
                model: Course,
                key: 'courseID'
            }
        }
    },
    { sequelize, tableName: 'cs_requirements', timestamps: false}
    
)

export {CSCore}



