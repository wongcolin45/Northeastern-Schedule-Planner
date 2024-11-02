import {fetchSchedule} from "../API/requirementsAPI.js";


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
                   {year: startYear, semester: "Fall", courses: [null, null, null, null]},
                   {year: startYear, semester: "Spring", courses: [null, null, null, null]}]
            }];
        this.year = 2;
        this.startYear = startYear;
    }

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

    addSemester() {
        const end = this.schedule.length - 1;
        const plans = this.schedule[end].plans;
        if (plans.length === 1) {
            plans.push({year: this.year, semester: "Spring", courses: [null, null, null, null]});
        } else if (plans.length === 2) {
            plans.push({year: this.year, semester: "Summer", courses: [null, null, null, null]});
        }
    }

    removeSemester(yearIndex) {
        const plans = this.schedule[yearIndex].plans;
        if (plans.length !== 1) {
            plans.pop();
        }

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
                    {year: this.year, semester: "Fall", courses: [null, null, null, null]},
                    {year: this.year, semester: "Spring", courses: [null, null, null, null]}
                ]
        });
        this.year++;
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

        // Deep copy of the schedule
        newSchedule.schedule = this.schedule.map(year => ({
            Year: year.Year,
            plans: year.plans.map(plan => ({
                year: plan.year,
                semester: plan.semester,
                courses: this.getCoursesCopy(plan.courses) // Create a shallow copy of the courses array courses: [...plan.courses]
            }))
        }));
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