import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

















let sql;

const db = new sqlite3.Database('../database/neu_database.db', sqlite3.OPEN_READWRITE, (error) => {
    if (error) {
        console.log(error.message);
    }
});

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
})

//return [] of requirements
async function getRequirements() {
    sql = 'SELECT DISTINCT requirement_name FROM cs_requirements';
    return new Promise((resolve, reject) => {
        db.all(sql, [], (error, rows) => {
            if (error) return console.log('error querying requirements');
            const requirements = rows.map(row => row.requirement_name);  
            resolve(requirements);
        });
    });
}
//return [] of sub requirement names
async function getSubRequirements(requirement_name) {
    sql = `SELECT DISTINCT sub_requirement_name FROM cs_requirements WHERE requirement_name = ?`;
    return new Promise((resolve, reject) => {
        db.all(sql, [requirement_name], (error, rows) => {
            if (error) return console.log(`Error querying subrequirements given: ${requirement_name}`);
            const subRequirements = rows.map(row => row.sub_requirement_name);

            resolve(subRequirements);
        });
    });
    
   
}
//returns [] of classes => {className: 'Biology', mandatory: 'True'}
async function getCourses(requirement_name, sub_requirement_name) {
    const sql = `
                SELECT course_name, r.must_take, department, course_number
                FROM cs_requirements AS r
                INNER JOIN courses AS c
                ON r.course_id = c.course_id
                WHERE requirement_name = ? AND sub_requirement_name = ?;
                `;
  
    return new Promise((resolve, reject) => {
        db.all(sql, [requirement_name, sub_requirement_name], (error, rows) => {
            if (error) return console.log('error querying classes');
            const courses = rows.map((row) => {
                const course_code = row.department +' '+ row.course_number;
                return {className: row.course_name, mandatory: row.must_take == 1, courseCode: course_code}
            });     
            resolve(courses);
        });
    });
}
async function getCoursesRequired(requirement_name, sub_requiremnt_name) {
    const sql = `
                SELECT courses_required
                FROM cs_requirements
                WHERE requirement_name = ? AND sub_requirement_name = ?
                LIMIT 1;
                `;
    return new Promise((resolve, reject) => {
        db.get(sql, [requirement_name, sub_requiremnt_name], (error, row) => {
            if (error) console.log('error getting description');

            resolve(row.courses_required);
        });
    });
}
async function getRequirementsOutline() {

    const requirements = [];

    const requirement_names = await getRequirements();

    for (const requirement_name of requirement_names) {

        const requirement_section = {name: requirement_name}

        const subrequirements = await getSubRequirements(requirement_name);

        const subrequirements_section = await Promise.all(subrequirements.map(async (subrequirement_name) => {
            
            const subrequirement = { name: subrequirement_name };

            // Fetch classes for the current subrequirement
            const courses = await getCourses(requirement_name, subrequirement_name);

            subrequirement.courses = courses;

            //Find right description:
            const coursesRequired = await getCoursesRequired(requirement_name,subrequirement_name);

            subrequirement.coursesRequired = coursesRequired;

            return subrequirement;
        }));

        requirement_section.subsections = subrequirements_section; 

        requirements.push(requirement_section);  
    }
    return requirements;

}


app.get('/api/requirements', async (request, response) => {

    try {
        const outline = await getRequirementsOutline();
        return response.status(200).send(outline);
    }catch (error){
        console.log(error);
        return response.sendStatus(400);
    }

});



async function getConcentrationCourses(table, section) {
    sql = `
                SELECT course_name, department, course_number, must_take
                FROM ${table}
                INNER JOIN courses
                ON courses.course_id = ${table}.course_id
                WHERE section_requirement = ?;
                `;

    return new Promise((resolve, reject) => {
        db.all(sql, [section], (error, rows) => {
            if (error){
                console.log('error getting concentration');
                reject(error);
            }
            
            const classes = rows.map(row => {   
                const courseCode = row.department + ' ' + row.course_number;
                
                const course = {className: row.course_name, courseCode: courseCode, mandatory: row.must_take == 1}

                return course
            });
            resolve(classes);
            });
        });
 }


 async function getConcentrationOutline(concentration) {
    const outline = { name: getConcentrationName(concentration) + ' Concentration'};
    const table = `${concentration}_concentration`;
    const sql = `SELECT DISTINCT section_requirement FROM ${table}`;

    return new Promise((resolve, reject) => {
        db.all(sql, [], async (error, rows) => {
            if (error) {
                console.log('error querying concentration outline');
                return reject(error);
            }
            try {
                const sections = await Promise.all(rows.map(async (row) => {
                    const section = { name: row.section_requirement };
                   
                    section.courses = await getConcentrationCourses(table, row.section_requirement);

                    section.coursesRequired = (row.section_requirement.includes('one')) ? 1 : 2;
                    
                    

                    return section;
                }));
                


                outline.sections = sections;
                resolve(outline);
            } catch (err) {
                reject(err);
            }
        });
    });
}

function getConcentrationName(a) {
    if (a === 'ai') 
        return 'Artificial Inteligence'
    else if (a === 'hcc') 
        return 'Human Centered Computing'
    else 
        return a.charAt(0).toUpperCase() + a.slice(1);
}

app.get('/api/computerscience/:concentration', async (request, response) => {
    try {
        const {concentration} = request.params;

        const outline = await getConcentrationOutline(concentration);
        return response.status(200).send(outline);
    }catch (error){
        console.log(error);
        return response.sendStatus(400);
    }
});



