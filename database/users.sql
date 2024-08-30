



CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT 
);

INSERT INTO users
    (user_name)
VALUES
    ('ColinWong');


CREATE TABLE courses_taken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);








