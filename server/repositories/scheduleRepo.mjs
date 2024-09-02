import getCSCore from "./computerScienceRepo.mjs"

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

const isCourseTaken = (coursesTaken, course) => {
    return coursesTaken.some(c => c.courseCode === course.courseCode);
}

function getCourseOptions(coursesTaken, courseOptions, coursesRequired) {
    let left = coursesRequired;
    const options = []
    courseOptions.forEach(course => {
        if (isCourseTaken(coursesTaken, course)) {
            left--;
        }else {
            options.push(course);
        }
    })
    return {options: options, left: left}
}

async function getIncompleteRequirements(courses) {
    const outline = await getCSCore();
    const requirements = [];
    outline.forEach(requirement => {
        requirement.subsections.forEach(section => {
            const options = getCourseOptions(courses, section.courses, section.coursesRequired);
            
            if (options.left > 0) {
                options.name = section.name;
                requirements.push(options)
            }  
        })
    })
    return requirements;
}





async function getIncomplete(schedule) {
    const courses = getCourses(schedule);
    const incomplete = getIncompleteRequirements(courses);
    return incomplete;
}


async function generateSchedule(schedule, length) {
    const plan = [];
    const incomplete = await getIncomplete(schedule);


    const fundiesIndex = incomplete.findIndex(r => r.name.includes('Fundamentals'));

   
    if (fundiesIndex !== -1) {
        const options = incomplete[fundiesIndex].options;
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

    if (plan.length === length) {
        return plan;
    }
    //plan check
    console.log('====== pLan check ==========');
    console.log(plan);
    if (plan.length === 0) { 
        console.log('=========================')
        console.log('plans index isnt 1 !!!!!!')
        console.log('=========================')                               
        const coreIndex = incomplete.findIndex(r => r.name === 'Computer Science Required Courses');
        console.log(`core index = ${coreIndex}`);
        if (coreIndex != -1) {
            const current = incomplete[coreIndex]
            let left = current.left;
            console.log(`left is ${left}`);
            while (left > 0 && plan.length < 2) {
                const course = current.options.shift();
                plan.push(course);
            }
        }
    }

    


    let i = incomplete.findIndex(r => !r.name.includes('Computer Science'));
    while (plan.length < length && i < incomplete.length) {
        const current = incomplete[i];
        plan.push(current.options[0]);
        i++;
    }
    return plan;

}



export {generateSchedule}