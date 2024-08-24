

import { Model, DataTypes } from 'sequelize';

import sequelize from '../Configuration/connection.mjs';


class Course extends Model {}

Course.init(
    {
        courseID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'course_id'
        },
        courseName: {
            type: DataTypes.TEXT,
            field: 'course_name'
        },
        department: {
            type: DataTypes.TEXT,
            field: 'department'
        },
        courseNumber: {
            type: DataTypes.INTEGER,
            field: 'course_number'
        },
        prerequisite: {
            type: DataTypes.INTEGER,
            field: 'prerequisite'
        },
        lab: {
            type: DataTypes.INTEGER,
            field: 'lab_number',
        },
        seminar: {
            type: DataTypes.INTEGER,
            field: 'seminar_number'
        },
        attribute: {
            type: DataTypes.TEXT,
            field: 'attributes'
        },
        mandatory: {
            type: DataTypes.INTEGER,
            field: 'must_take'
        },
        credit: {
            type: DataTypes.INTEGER,
            field: 'credits'
        }
    },
    { sequelize, tableName: 'courses', timestamps: false}
    
)




export {Course}