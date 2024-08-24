
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../database/neu_database.db'
  });
  

async function authenticateDatabase() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

//authenticateDatabase();

async function syncDatabase() {
    try {
        await sequelize.sync(); // or use { force: true } or { alter: true }
        //console.log('Database synchronized');
    } catch (error) {
        //console.error('Error syncing database:', error);
    }
}

export {authenticateDatabase, syncDatabase};

export default sequelize;