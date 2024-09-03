import getCSCore from "./computerScienceRepo.mjs"
import getConcentration from "./concentration.mjs"



function testValue(name, value) {
    console.log('==================================');
    console.log('       CHECKING : '+name);
    console.log('==================================');
    console.log(value);
}




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

const getCourseIndex = (coursesTaken, course) => {
    return coursesTaken.findIndex(c => c.courseCode === course.courseCode);
}

function getCourseOptions(coursesTaken, courseOptions, coursesRequired) {
    let left = coursesRequired;
    const options = []
    courseOptions.forEach(course => {
        const index = getCourseIndex(coursesTaken, course);
        if (index != -1) {
            
            left--;
        }else {
            options.push(course);
        }
    })
    return {options: options, left: left}
}

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







async function getIncomplete(outline, schedule) {
    
    const courses = getCourses(schedule);
    const incomplete = await getIncompleteRequirements(outline, courses);
    return incomplete;
}




async function generateSchedule(schedule, length) {
    const plan = [];
    const core = await getCSCore()
    const incomplete = await getIncomplete(core, schedule);

    const concentration = await getConcentration('ai');
    const incompleteConcentration = await getIncomplete([concentration], schedule);

    if (incomplete.length + incompleteConcentration.length === 0) {
        return plan;
    }

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

   
 ;
    if (plan.length === 0) { 
        
        const coreIndex = incomplete.findIndex(r => r.name === 'Computer Science Required Courses');
        if (coreIndex != -1) {
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
        plan.push(current.options[0]);
        i++;
    }
    return plan;

}



export {generateSchedule}