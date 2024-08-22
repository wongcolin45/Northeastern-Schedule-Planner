
CREATE TABLE cs_requirements (
    requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    requirement_name TEXT DEFAULT NULL,
    sub_requirement_name TEXT DEFAULT 0,
    courses_required INTEGER,
    must_take INTEGER DEFAULT NULL,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

--Computer Science Overview
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, must_take, course_id)
VALUES 
    ('Computer Science Overview', 2, 1, 12),
    ('Computer Science Overview', 2, 1, 13);
--Computer Science Fundamentals
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, must_take, course_id)
VALUES 
    ('Computer Science Fundamentals', 3, 1, 14),
    ('Computer Science Fundamentals', 3, 1, 15),
    ('Computer Science Fundamentals', 3, 1, 16);
--Computer Science Required Courses
INSERT INTO cs_requirements 
    (sub_requirement_name, must_take, courses_required, course_id)
VALUES 
    ('Computer Science Required Courses', 1, 6, 17),
    ('Computer Science Required Courses', 1, 6, 18),
    ('Computer Science Required Courses', 1, 6, 19),
    ('Computer Science Required Courses', 1, 6, 20),
    ('Computer Science Required Courses', 0, 6, 21),
    ('Computer Science Required Courses', 0, 6, 22),
    ('Computer Science Required Courses', 1, 6, 51);
--Security Required Courses
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, course_id)
VALUES 
    ('Security Requirement', 1, 44),
    ('Security Requirement', 1, 45),
    ('Security Requirement', 1, 46);
--Presentation Requirement
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, course_id)
VALUES 
    ('Presentation Requirement', 1, 8),
    ('Presentation Requirement', 1, 9),
    ('Presentation Requirement', 1, 10),
    ('Presentation Requirement', 1, 11),
    ('Presentation Requirement', 1, 89),
    ('Presentation Requirement', 1, 90),
    ('Presentation Requirement', 1, 91),
    ('Presentation Requirement', 1, 92);
--Mathematics Courses
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, course_id)
VALUES 
    ('Mathematics Courses', 2, 73),
    ('Mathematics Courses', 2, 75);
--Computing and Social Issues
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, course_id)
VALUES 
    ('Computing and Social Issues', 1, 1),
    ('Computing and Social Issues', 1, 47),
    ('Computing and Social Issues', 1, 48),
    ('Computing and Social Issues', 1, 66),
    ('Computing and Social Issues', 1, 67),
    ('Computing and Social Issues', 1, 68),
    ('Computing and Social Issues', 1, 79),
    ('Computing and Social Issues', 1, 78),
    ('Computing and Social Issues', 1, 87),
    ('Computing and Social Issues', 1, 88),
    ('Computing and Social Issues', 1, 89);
--Eletrical Engineering
INSERT INTO cs_requirements 
    (sub_requirement_name, must_take, courses_required, course_id)
VALUES 
    ('Electrical Engineering', 1, 1, 55);
--Science Requirement
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, course_id)
VALUES 
    ('Science Requirement', 2, 2),
    ('Science Requirement', 2, 3),
    ('Science Requirement', 2, 4),
    ('Science Requirement', 2, 5),
    ('Science Requirement', 2, 6),
    ('Science Requirement', 2, 7),
    ('Science Requirement', 2, 59),
    ('Science Requirement', 2, 60),
    ('Science Requirement', 2, 61),
    ('Science Requirement', 2, 62),
    ('Science Requirement', 2, 63),
    ('Science Requirement', 2, 64),
    ('Science Requirement', 2, 65),
    ('Science Requirement', 2, 74),
    ('Science Requirement', 2, 76),
    ('Science Requirement', 2, 77),
    ('Science Requirement', 2, 80),
    ('Science Requirement', 2, 81),
    ('Science Requirement', 2, 82),
    ('Science Requirement', 2, 83),
    ('Science Requirement', 2, 84),
    ('Science Requirement', 2, 85);
--College Writing
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, must_take, course_id)
VALUES 
    ('College Writing', 1, 1, 56);
--Advanced Writing in the Disciplines
INSERT INTO cs_requirements 
    (sub_requirement_name, courses_required, course_id)
VALUES
    ('Advanced Writing in the Disciplines', 1, 57),
    ('Advanced Writing in the Disciplines', 1, 58);
------------------------------------
--Setting Requirement Names
------------------------------------
UPDATE cs_requirements
SET requirement_name = 'Computer Science Requirements'
WHERE requirement_id <= 23;

UPDATE cs_requirements
SET requirement_name = 'Supporting Courses'
WHERE requirement_id BETWEEN 24 AND 59;

UPDATE cs_requirements
SET requirement_name = 'Computer Science Writing Requirement'
WHERE requirement_id > 59;



------------------------------------
--Computer Science Concentrations
------------------------------------
--AI Concentration
CREATE TABLE ai_concentration (
    requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_requirement TEXT DEFAULT NULL,
    courses_required INT,
    must_take INTEGER DEFAULT 0,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO ai_concentration
    (section_requirement, courses_required, must_take, course_id) 
VALUES 
    ('Complete both', 2, 1, 23),
    ('Complete both', 2, 1, 52);

INSERT INTO ai_concentration
    (section_requirement, courses_required, course_id)
VALUES 
    ('Complete two of the following not already taken', 2, 24),
    ('Complete two of the following not already taken', 2, 25),
    ('Complete two of the following not already taken', 2, 26),
    ('Complete two of the following not already taken', 2, 27),
    ('Complete two of the following not already taken', 2, 53),
    ('Complete two of the following not already taken', 2, 70),
    ('Complete two of the following not already taken', 2, 86);
--Foundations
CREATE TABLE foundations_concentration (
    requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_requirement TEXT DEFAULT NULL,
    courses_required INT,
    must_take INTEGER DEFAULT 0,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO foundations_concentration
    (section_requirement, courses_required, course_id)
VALUES 
    ('Complete one of the following - section 1', 1, 28),
    ('Complete one of the following - section 1', 1, 32),
    ('Complete one of the following - section 2', 1, 29),
    ('Complete one of the following - section 2', 1, 31);

INSERT INTO foundations_concentration
    (section_requirement, courses_required, course_id)
VALUES 
    ('Complete two of the following not already taken', 2, 30),
    ('Complete two of the following not already taken', 2, 29),
    ('Complete two of the following not already taken', 2, 31),
    ('Complete two of the following not already taken', 2, 32),
    ('Complete two of the following not already taken', 2, 33),
    ('Complete two of the following not already taken', 2, 49);
--Human Centerd Computing 
CREATE TABLE hcc_concentration (
    requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_requirement TEXT DEFAULT NULL,
    courses_required INT,
    must_take INTEGER DEFAULT 0,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO hcc_concentration
    (section_requirement, courses_required, must_take, course_id)
VALUES
    ('Complete both', 2, 1, 71),
    ('Complete both', 2, 1, 72);


INSERT INTO hcc_concentration
    (section_requirement, courses_required, course_id)
VALUES
    ('Complete two of the following not already taken', 2, 24),
    ('Complete two of the following not already taken', 2, 34),
    ('Complete two of the following not already taken', 2, 35),
    ('Complete two of the following not already taken', 2, 54),
    ('Complete two of the following not already taken', 2, 69);
--Software
CREATE TABLE software_concentration (
    requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_requirement TEXT DEFAULT NULL,
    courses_required INT,
    must_take INTEGER DEFAULT 0,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO software_concentration
    (section_requirement, courses_required, must_take, course_id)
VALUES
    ('Complete both', 2, 1, 28),
    ('Complete both', 2, 1,  36);
INSERT INTO software_concentration
    (section_requirement, courses_required, course_id)
VALUES
    ('Choose one', 1, 37),
    ('Choose one', 1, 38);
INSERT INTO software_concentration
    (section_requirement, courses_required, course_id)
VALUES
    ('Complete one of the following not already taken', 1, 39),
    ('Complete one of the following not already taken', 1, 40),
    ('Complete one of the following not already taken', 1, 34),
    ('Complete one of the following not already taken', 1, 35),
    ('Complete one of the following not already taken', 1, 37),
    ('Complete one of the following not already taken', 1, 38),
    ('Complete one of the following not already taken', 1, 32),
    ('Complete one of the following not already taken', 1, 33);
--Systems
CREATE TABLE systems_concentration (
    requirement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_requirement TEXT DEFAULT NULL,
    courses_required INT,
    must_take INTEGER DEFAULT 0,
    course_id INTEGER,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
INSERT INTO systems_concentration 
    (section_requirement, courses_required, course_id)
VALUES  
    ('Choose one', 1, 37),
    ('Choose one', 1, 38);
INSERT INTO systems_concentration 
    (section_requirement, courses_required, course_id)
VALUES  
    ('Choose one of the following not already taken', 1, 45),
    ('Choose one of the following not already taken', 1, 46);
INSERT INTO systems_concentration 
    (section_requirement, courses_required, course_id)
VALUES  
    ('Choose two of the following not already taken', 1, 39),
    ('Choose two of the following not already taken', 1, 41),
    ('Choose two of the following not already taken', 1, 42),
    ('Choose two of the following not already taken', 1, 27),
    ('Choose two of the following not already taken', 1, 37),
    ('Choose two of the following not already taken', 1, 43),
    ('Choose two of the following not already taken', 1, 38),
    ('Choose two of the following not already taken', 1, 45),
    ('Choose two of the following not already taken', 1, 46),
    ('Choose two of the following not already taken', 1, 50);



    

   







    

















