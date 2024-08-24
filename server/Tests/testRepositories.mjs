

import { CSCore } from "../Models/CSCore.mjs";
import { Course } from "../Models/Course.mjs";

import sequelize from "../Configuration/connection.mjs";




async function tableReal(model) {
    const tableName = model.tableName;
    console.log(`============Test: tableReal(${model.name})===========`);
    try {
        const [results] = await sequelize.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
        console.log(`${tableName} table exists is:`, results);
    } catch (error) {
        console.error('Error checking table existence:', error);
    }
}



async function runTests() {
    await tableReal(CSCore);
    await tableReal(Course);
}

runTests();
