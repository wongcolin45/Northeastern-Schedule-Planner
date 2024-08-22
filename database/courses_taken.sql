

CREATE TABLE courses_taken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);





