
import { Model, DataTypes } from 'sequelize';

import sequelize from '../Configuration/connection.mjs';


class Concentration extends Model {}

const createConcentrationModel = (tableName) => {
    CSConcentration.init(
    {
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
    }, { sequelize }, { tableName: tableName}
    )
}


const AIConcentration = createConcentrationModel('ai_concentration');
const HCCConcentration = createConcentrationModel('hcc_concentration');
const SoftwareConcentration = createConcentrationModel('software_concentration');
const SystemsConcentration = createConcentrationModel('systems_concentration');
const FoundationsConcentration = createConcentrationModel('foundations_concentration');

export { AIConcentration, HCCConcentration, SoftwareConcentration, SystemsConcentration, FoundationsConcentration };




