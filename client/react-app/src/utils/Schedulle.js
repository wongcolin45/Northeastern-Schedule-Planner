import {fetchSchedule} from "../API/requirementsAPI.js";


/**
 * This class represents a schedule and related logic to editing it.
 */
class Schedule {

    constructor(startYear) {
        this.schedule =
            [{Year: 1,
                plans: [
                   {year: startYear, semester: "Fall", courses: [null, null, null, null]},
                   {year: startYear, semester: "Spring", courses: [null, null, null, null]}]
            }];
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
                            return false;
                        }else if (c.courseCode === prerequisiteCode) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    addCourse(yearIndex, semesterIndex, courseIndex, courseInfo) {
        const courses = this.getSemesterPlan(yearIndex, semesterIndex);
        courses[courseIndex] = courseInfo;
    }

    removeCourse(yearIndex, semesterIndex, courseIndex) {
        const courses = this.getSemesterPlan(yearIndex, semesterIndex);
        courses[courseIndex] = null;
    }

    clearSemesterPlan(yearIndex, semesterIndex) {
        this.getSemesterPlan(yearIndex, semesterIndex).courses = [null, null, null, null];
    }

    generateSemesterPlan(yearIndex, semesterIndex) {
        fetchSchedule(this.schedule).then(plan => {
            if (plan.length !== 0) {
                const courses = this.getSemesterPlan(yearIndex, semesterIndex).courses;
                courses.forEach((course, index) => {
                    if (course === null && plan.length > 0) {
                        courses[index] = plan.pop();
                    }
                })
            }
        }).catch(error => {
            console.error("Error fetching schedule:", error);
        });
    }

    getSchedule() {
        return this.schedule;
    }

    // Helper Methods
    getSemesterPlan(yearIndex, semesterIndex) {
        const yearPlan = this.schedule[yearIndex].plans;
        return yearPlan[semesterIndex];
    }
}

export default Schedule;