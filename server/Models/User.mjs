
import { Model, DataTypes } from 'sequelize';
import { Course } from './Course.mjs';

import sequelize from '../Configuration/connection.mjs';


class User extends Model {}

User.init(
    {
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'user_id'
        },
        name: {
            type: DataTypes.TEXT,
            field: 'user_name'
        }
    },
    { sequelize, tableName: 'users', timestamps: false}
    
)

export {User}



