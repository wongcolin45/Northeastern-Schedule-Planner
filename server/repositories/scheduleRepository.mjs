import getCSCore from "./computerScienceRepository.mjs"
import getConcentration from "./concentrationRepository.mjs"


/**=========================
 * Helper Methods
 *=========================/

/**
 * Gets the courses taken from the schedule.
 * @param schedule the user's schedule
 * @returns {Object[]} the course info
 */
function getCourses(schedule) {
    const courses = []
    schedule.forEach(y => {
        y.plans.forEach(plan => {
            plan.courses.forEach(course => {
                if (course != null) {
                    courses.push(course);
                }
            })
        })
    })
    return courses;
}

/**
 * Get the index of the course in courseTaken.
 * @param coursesTaken the courses taken
 * @param course the course to check
 * @returns {int} the index of the course
 */
const getCourseIndex = (coursesTaken, course) => {
    return coursesTaken.findIndex(c => c.courseCode === course.courseCode);
}

/**
 * Gets the courses options still needed to take.
 * @param coursesTaken the courses the user has taken
 * @param courseOptions the course options
 * @param coursesRequired the number of courses required
 * @returns {{options: Object[], left}}
 */
function getCourseOptions(coursesTaken, courseOptions, coursesRequired) {
    let left = coursesRequired;
    const options = []
    courseOptions.forEach(course => {
        const index = getCourseIndex(coursesTaken, course);
        if (index !== -1) {
            left--;
        }else {
            options.push(course);
        }
    })
    return {options: options, left: left}
}

/**
 * Gets the requirements need to complete.
 * @param outline the outline of cs requirements
 * @param courses the courses the user has complete
 * @returns {Promise<Object[]>} the requirement with the courses options to take
 */
async function getIncompleteRequirements(outline, courses) {
    const requirements = [];
    outline.forEach(requirement => {
        requirement.sections.forEach(section => {
            const unique = section.name.includes('not already taken');
            const options = getCourseOptions(courses, section.courses, section.coursesRequired, unique);
            
            if (options.left > 0) {
                options.name = section.name;
                requirements.push(options)
            }  
        })
    })
    return requirements;
}


/**
 * Gets the incomplete requirements outline.
 * @param outline the outline of the requirements (in this case cs core requirements)
 * @param schedule the user's schedule
 * @returns {Promise<Object[]>} the outline of requirements, how many courses left
 *                              along with the course options that can satisfy them
 */
async function getIncomplete(outline, schedule) {
    
    const courses = getCourses(schedule);
    return await getIncompleteRequirements(outline, courses);
}




/**=========================
 * Main Method
 *=========================/

/**
 * Generates the users schedule for a semester (up to 4 courses)
 * @param schedule the user's current schedule
 * @param length how many courses the generated schedule should be
 * @returns {Promise<Object[]>} the list of course objects that make up the generated schedule
 */
async function generateSchedule(schedule, length) {
    const plan = [];
    const core = await getCSCore()
    const incomplete = await getIncomplete(core, schedule);

    const concentration = await getConcentration('ai');
    const incompleteConcentration = await getIncomplete([concentration], schedule);

    if (incomplete.length + incompleteConcentration.length === 0) {
        return plan;
    }

    let options;
    let index;
    // Checks for CS Core Stuff
    if (incomplete.length > 0) {
        // Check if First Year Seminar Taken
        // If First Year Seminar not taken add it to schedule
        options = incomplete[0].options;
        const seminarIndex = options.findIndex(course => course.className === 'First Year Seminar');
        if (seminarIndex !== -1) {
            plan.push(options[seminarIndex]);
        }

        const pIndex = incomplete.findIndex(r => r.name === 'Computing and Social Issues');
        if (pIndex !== -1) {
            options = incomplete[pIndex].options;
            const index = options.findIndex(c => c.className === 'Technology and Human Values');
            if (index !== -1) {
                plan.push(options[index]);
            }
        }



        // Check if Fundamentals 1 and Fundamentals 2 Taken
        const fundamentalsIndex = incomplete.findIndex(r => r.name.includes('Fundamentals'));

        // Check if Fundamentals 1, 2 and Discrete Structures are taken.
        // If either Fundamentals 1 and Discrete Structure not taken add them to schedule them
        // If Fundamentals 1 complete take Fundamentals 2 if not already taken
        if (fundamentalsIndex !== -1) {
            const options = incomplete[fundamentalsIndex].options;
            const index1 = options.findIndex(course => course.className === 'Fundamentals of Computer Science 1');
            const index2 = options.findIndex(course => course.className === 'Fundamentals of Computer Science 2');
            const index3 = options.findIndex(course => course.className === 'Discrete Structures');
            if (index1 !== -1) {
                plan.push(options[index1]);
            }else if (index2 !== -1) {
                plan.push(options[index2]);
            }
            if (index3 !== -1 && plan.length < length) {
                plan.push(options[index3]);
            }
        }

        // If all Fundamentals Courses Taken add the Khoury Co-op courses if not already taken
        const coopIndex = options.findIndex(course => course.className === 'Professional Development for Khoury Co-op');
        if (coopIndex !== -1 && fundamentalsIndex === -1) {
            plan.push(options[coopIndex]);
        }

    }



    // If schedule meets length return it
    if (plan.length === length) {
        return plan;
    }




    if (plan.length === 0) {

        const coreIndex = incomplete.findIndex(r => r.name === 'Computer Science Required Courses');
        if (coreIndex !== -1) {
            const current = incomplete[coreIndex]
            let left = current.left;     
            while (left > 0 && plan.length < 2) {
                const course = current.options.shift();
                plan.push(course);
            }
        }
        if (incompleteConcentration.length > 0) {
            plan.push(incompleteConcentration[0].options[0]);
        }
    }

    let i = incomplete.findIndex(r => !r.name.includes('Computer Science'));




    while (plan.length < length && i < incomplete.length) {
        const current = incomplete[i];
        if (!current) {
            break;
        }
        plan.push(current.options[0]);
        i++;
    }
    return plan;

}


export {generateSchedule}