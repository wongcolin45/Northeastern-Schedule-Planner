
import { Model, DataTypes } from 'sequelize';
import { Course } from './Course.mjs';

import sequelize from '../Configuration/connection.mjs';


class APCredit extends Model {}

APCredit.init(
    {
        apID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'ap_id'
        },
        courseName: {
            type: DataTypes.TEXT,
            field: 'ap_course_name'
        },
        attributes: {
            type: DataTypes.TEXT,
            field: 'attributes'
        },
        courseID: {
            type: DataTypes.INTEGER,
            field: 'course_id',
            references: {
                model: Course,
                key: 'courseID'
            }
        },
        courseID2: {
            type: DataTypes.INTEGER,
            field: 'course_id_2',
            references: {
                model: Course,
                key: 'courseID_2'
            }
        }
    },
    { sequelize, tableName: 'ap_credits', timestamps: false}
)

export {APCredit}



