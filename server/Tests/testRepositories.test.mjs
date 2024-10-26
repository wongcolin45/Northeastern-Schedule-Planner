
import getCSCore from "../repositories/computerScienceRepository.mjs";

import getCourseById from "../repositories/coursesRepository.mjs";



async function testGetCourseById() {
    const calc1 = await getCourseById(72);
    console.log(calc1);
}


//await testGetCourseById();

async function testGetCSCore() {
    const data = await getCSCore();
}

await testGetCSCore()







