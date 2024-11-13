import {fetchSchedule} from "../API/requirementsAPI.js";





const conversions = {
    "Ethical Reasoning": "Employing Ethical Reasoning",
    "[]": [

        "Integrating Knowledge and Skills Through Experience"
    ],
    "Natural/Designed World" : "Engaging with the Natural and Designed World",
    "Formal/Quant Reasoning" : "Conducting Formal and Quantitative Reasoning",
    "Creative Express/Innov": "Exploring Creative Expression and Innovation",
    "Interpreting Culture": "Interpreting Culture",
    "Societies/Institutions": "Understanding Societies and Institutions",
    "Analyzing/Using Data": "Analyzing and Using Data",
    "Difference/Diversity": "Engaging Differences and Diversity",
    "Writing Intensive": "Writing Across Audiences and Genres",
    "Capstone Experience": "Demonstrating Thought and Action in a Capstone"
}


function convertAttributes(attributes) {
    if (attributes === undefined || attributes == null) {
        return [];
    }
    const requirements = [];
    const names = attributes.split(',');
    names.forEach(name => {
        if (name in conversions) {
            requirements.push(conversions[name]);
        }
    })
    return requirements;
}

class NUPath {

    constructor() {
        this.path = {
            "Engaging with the Natural and Designed World": new Set(),
            "Exploring Creative Expression and Innovation": new Set(),
            "Interpreting Culture": new Set(),
            "Conducting Formal and Quantitative Reasoning": new Set(),
            "Understanding Societies and Institutions": new Set(),
            "Analyzing and Using Data": new Set(),
            "Engaging Differences and Diversity": new Set(),
            "Employing Ethical Reasoning": new Set(),
            "Writing Across Audiences and Genres": new Set(),
            "Integrating Knowledge and Skills Through Experience": new Set(),
            "Demonstrating Thought and Action in a Capstone": new Set()
        }
    }

    // convertAttributes(attributes) {
    //     if (attributes === undefined || attributes == null) {
    //         return [];
    //     }
    //     const requirements = [];
    //     const names = attributes.split(',');
    //     names.forEach(name => {
    //         if (name in conversions) {
    //             requirements.push(conversions[name]);
    //         }
    //     })
    //     return requirements;
    // }

    getCompetenciesCompleted() {
        let total = 0;
        for (const key in this.path) {
            if (this.path[key].size >= 1) {
                total++;
            }
        }
        return total;
    }

    addCourses(courses) {
        courses.forEach(course => {
            const attributes = convertAttributes(course.attributes);
            attributes.forEach(attribute => {
                this.path[attribute].add(course.className);
            })
        })
    }



    addCoops(names) {
        names.forEach(name => {
            this.path["Integrating Knowledge and Skills Through Experience"].add(name);
        })
    }

    getPath() {
        return Object.fromEntries(
            Object.entries(this.path).map(([key, value]) => [key, new Set(value)])
        );
    }

}


// Possible new outline ? , too many objects

class SemesterPlan {
    constructor(season) {
        this._season = season;
        this._courses = [null, null, null, null];
        this.coop = false;
    }

    getSeason() {
        return this._season;
    }

    withCourse(course, index) {
        this.courses[index] = course;
    }

    withCourses(courses) {
        this.courses.forEach((_, index) => {
            if (this.courses[index] !== null && courses) {
                this.courses[index] = courses.pop();
            }
        })
    }

    withCoop() {
        this.coop = !this.coop;
    }

    getCourses() {
        return this._courses;
    }

    clone() {
        const newSemester = new SemesterPlan(this._season);
        return newSemester.withCourses([...this.courses])
    }
}

class AcademicYearPlan {

    constructor() {
        const fall = new SemesterPlan('Fall');
        const spring = new SemesterPlan('Spring');
        this.semesters = [fall, spring];
    }

    withAddedSemester() {
        if (this.semesters.length === 1) {
            this.semesters.push(new SemesterPlan('Spring'))
        }else if (this.semesters.length === 2) {
            this.semesters.push(new SemesterPlan('Summer'))
        }
        return this.clone();
    }

    withRemovedSemester() {
        if (this.semesters.length !== 1) {
            this.semesters.pop();
        }
        return this.clone();
    }

    #setSemesters(semesters) {
        this.semester = semesters.map(semester => {
            return semester.clone();
        })
    }

    clone() {
        const newAcademicYear = new AcademicYearPlan();
        newAcademicYear.#setSemesters([...this.semesters]);
        return newAcademicYear;
    }
}

class SchedulePlan {

    constructor() {
        const firstYear = new AcademicYearPlan();
        this.plans = [firstYear];
    }

    withAddedYear() {
        const newYear = new AcademicYearPlan();
        this.plans.push(newYear);
        return this.lone();
    }

    widthRemovedYear() {
        if (this.plans.length !== 1) {
            this.plans.pop();
        }
        return this.clone();
    }

    #setPlans(plans) {
        this.plans = []
        plans.forEach(plan => {
            this.plans.push(plan.clone());
        })
    }

    clone() {
        const newSchedulePlan = new SchedulePlan();
        newSchedulePlan.#setPlans(this.plans);
    }

}



/**
 * This class represents a schedule and related logic to editing it.
 */
class Schedule {

    /**
     * Initializes the schedule object.
     * @param startYear the year the user started university
     */
    constructor(startYear) {
        this.schedule =
            [{Year: 1,
                plans: [
                   {year: startYear, semester: "Fall", courses: [null, null, null, null], coop: false},
                   {year: startYear, semester: "Spring", courses: [null, null, null, null],  coop: false}]
            }];
        this.year = 2;
        this.startYear = startYear+1;
        this.apCourses = []
    }

    // Course logic

    courseTaken(courseCode) {
        if (courseCode === null) {
            return true;
        }
        return this.schedule.some(y =>
                    y.plans.some(p =>
                        p.courses.some(c => {
                            return (c != null && c.courseCode === courseCode)
                        })
                    )
        );
    }

    coursePrerequisiteMet(courseCode, prerequisiteCode) {
        if (courseCode === null || prerequisiteCode === null) {
            return true;
        }
        for (const y of this.schedule) {
            for (const p of y.plans) {
                for (const c of p.courses) {
                    if (c !== null) {
                        if (c.courseCode === courseCode) {
                            return true;
                        }else if (c.courseCode === prerequisiteCode) {
                            return false;
                        }
                    }
                }
            }
        }
        return false;
    }

    /*
    Changes the courses
     */

    addCourse(yearIndex, semesterIndex, courseIndex, courseInfo) {
        const courses = this.getSemesterPlan(yearIndex, semesterIndex).courses;
        courses[courseIndex] = courseInfo;
    }

    removeCourse(yearIndex, semesterIndex, courseIndex) {
        const courses = this.getSemesterPlan(yearIndex, semesterIndex).courses;
        courses[courseIndex] = null;
    }

    getCourse(yearIndex, semesterIndex, courseIndex) {
        const courses = this.getSemesterPlan(yearIndex, semesterIndex).courses;
        return courses[courseIndex];
    }

    // Changes Semester

    withNewSemester(yearIndex) {
        const plans = this.schedule[yearIndex].plans;
        if (plans.length === 1) {
            plans.push(
                {year: this.year, semester: "Spring", courses: [null, null, null, null],  coop: false});
        } else if (plans.length === 2) {
            plans.push(
                {year: this.year, semester: "Summer", courses: [null, null, null, null],  coop: false});
        }
        return this.getSchedule();
    }

    withLessSemester(yearIndex) {
        const plans = this.schedule[yearIndex].plans;
        if (plans.length !== 1) {
            plans.pop();
        }
        return this.getSchedule();
    }

    isSemesterFull(yearIndex, semesterIndex) {
        return this.getSemesterPlan(yearIndex, semesterIndex).courses.every(course => {
            return course !== null;
        })
    }

    clearSemesterPlan(yearIndex, semesterIndex) {
        this.getSemesterPlan(yearIndex, semesterIndex).courses = [null, null, null, null];
    }

    getSemesterPlan(yearIndex, semesterIndex) {
        const yearPlan = this.schedule[yearIndex].plans;
        return yearPlan[semesterIndex];
    }

    // Changes Years
    addYear() {
        this.schedule.push({Year: this.year,
            plans: [
                    {year: this.startYear, semester: "Fall", courses: [null, null, null, null], coop: false},
                    {year: this.startYear, semester: "Spring", courses: [null, null, null, null], coop: false}
                ]
        });
        this.year++;
        this.startYear++;
    }

    removeYear() {
        if (this.schedule.length !== 1) {
            this.schedule.pop();
        }
    }

    getYearPlan(yearIndex) {
        return this.schedule[yearIndex].plans;
    }

    // generate schedule from api
    async generateSemesterPlan(yearIndex, semesterIndex) {
        const plan = await fetchSchedule(this.schedule);
        if (plan.length !== 0) {
            const courses = this.getSemesterPlan(yearIndex, semesterIndex).courses;
            courses.forEach((course, index) => {
                if (course === null && plan.length > 0) {
                    courses[index] = plan.pop();
                }
            })
        }
        return this.getSchedule();
    }

    // NU path

    getPath() {
        const path = new NUPath();
        path.addCourses(this.getCoursesTaken());
        path.addCourses(this.apCourses);
        const coops = this.#getCoops();
        path.addCoops(coops);
        return path.getPath();
    }

    getNUPathCount() {
        const path = new NUPath();
        path.addCourses(this.apCourses);
        path.addCourses(this.getCoursesTaken());
        const coops = this.#getCoops();
        path.addCoops(coops);
        return path.getCompetenciesCompleted();
    }

    onCoop(yearIndex, semesterIndex) {
        return this.getSemesterPlan(yearIndex, semesterIndex).coop;

    }

    setCoop(yearIndex, semesterIndex) {
        const plan = this.getSemesterPlan(yearIndex, semesterIndex);
        plan.coop = !plan.coop;
        return this.getSchedule();
    }

    #getCoops() {
        const coops = [];
        this.schedule.forEach(year => {
           year.plans.forEach(plan => {
               if (plan.coop) {
                   coops.push(`${plan.semester} Coop ${plan.year}`);
               }
           })
        })
        return coops;
    }

    // Ap Courses


    withAPCourses(courses) {
        courses.forEach(course => {
            if (this.apCourses.length < 8) {
                this.apCourses.push(course);
            }
        })
        return this.getSchedule();
    }

    getAPCourses() {
        return [...this.apCourses];
    }



    // Other methods
    getPlans() {
        return this.schedule;
    }

    getCoursesCopy(courses) {
        const copy = [];
        courses.forEach((course) => {
            if (course === null) {
                copy.push(null);
            }else {
                copy.push({
                    className: course.className,
                    mandatory: course.mandatory,
                    courseCode: course.courseCode,
                    attributes: course.attributes,
                    prerequisite: course.prerequisite,
                })
            }
        })
        return copy;
    }

    getSchedule() {
        const newSchedule = new Schedule(this.startYear);
        newSchedule.schedule = this.schedule.map(year => ({
            Year: year.Year,
            plans: year.plans.map(plan => ({
                year: plan.year,
                semester: plan.semester,
                courses: this.getCoursesCopy(plan.courses),
                coop: plan.coop
            }))
        }));
        newSchedule.apCourses = this.getAPCourses();
        newSchedule.startYear = this.startYear;
        newSchedule.year = this.year;
        return newSchedule;
    }

    getCoursesTaken() {
        const courses = []
        this.schedule.forEach(year => {
            year.plans.forEach(plan => {
                plan.courses.forEach(course => {
                    if (course != null) {
                        courses.push(course);
                    }
                })
            })
        })
        return courses;
    }

}

export default Schedule;