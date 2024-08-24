
import { Model, DataTypes } from 'sequelize';

import sequelize from '../Configuration/connection.mjs';




const createConcentrationModel = (tableName) => {

    class Concentration extends Model {}

    return Concentration.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                field: 'requirement_id'
            },
            sectionRequirement: {
                type: DataTypes.TEXT,
                field: 'section_requirement'
            },
            coursesRequired: {
                type: DataTypes.INTEGER,
                field: 'courses_requiree'
            },
            mandatory: {
                type: DataTypes.INTEGER,
                field: 'must_take'
            },
            courseID: {
                type: DataTypes.INTEGER,
                field: 'course_id',
            }
        }, { sequelize, tableName: tableName, timestamps: false}
    )
}


const AIConcentration = createConcentrationModel('ai_concentration');
const HCCConcentration = createConcentrationModel('hcc_concentration');
const SoftwareConcentration = createConcentrationModel('software_concentration');
const SystemsConcentration = createConcentrationModel('systems_concentration');
const FoundationsConcentration = createConcentrationModel('foundations_concentration');

const Models = [AIConcentration, HCCConcentration, SoftwareConcentration, SystemsConcentration, FoundationsConcentration];



export { AIConcentration, HCCConcentration, SoftwareConcentration, SystemsConcentration, FoundationsConcentration };




