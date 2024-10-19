CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name TEXT DEFAULT NULL,
    department TEXT DEFAULT NULL,
    course_number INTEGER DEFAULT NULL,
    prerequisite INTEGER DEFAULT NULL, 
    lab_number INTEGER DEFAULT NULL, 
    seminar_number INTEGER DEFAULT NULL,
    attributes TEXT DEFAULT NULL,
    credits INTEGER DEFAULT 4,
    FOREIGN KEY (prerequisite) REFERENCES courses(course_id)
);
-------------------
--Africana Studies 
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Issues in Race, Science, and Technology', 'AFCS', 3466, NULL, NULL); 
-------------------
--Biology 
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('General Biology 1', 'BIOL', 1111, NULL, 'Natural/Designed World', 1112),
    ('General Biology 2', 'BIOL', 1113, 2, 'Natural/Designed World', 1114),
    ('Genetics and Molecular Biology','BIOL', 2301, 2, 'Natural/Designed World', 2302);
   
    
-------------------
--Chemistry 
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('General Chemistry for Science Majors', 'CHEM', 1161, NULL, 'Natural/Designed World', 1162),  
    ('General Chemistry 1', 'CHEM', 1211, NULL, 'Natural/Designed World', 1212),
    ('General Chemistry 2', 'CHEM', 1214, 6, 'Natural/Designed World', 1216);
-------------------
--Communications 
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Public Speaking', 'COMM', 1112, NULL, 'Creative Express/Innov'),
    ('Business and Professional Speaking', 'COMM', 1113, NULL, 'Creative Express/Innov'),
    ('Persuasion and Rhetoric','COMM', 1210, NULL, 'Interpreting Culture'),
    ('Communication and Storytelling','COMM', 1511, NULL, 'Creative Express/Innov');
-------------------
--Computer Science 
-------------------
INSERT INTO courses 
    (course_name, department, course_number, prerequisite, attributes, credits)
VALUES
    --Computer Science Overview
    ('First Year Seminar', 'CS', 1200, NULL, NULL, 1),
    ('Professional Development for Khoury Co-op', 'CS', 1210, NULL, NULL, 1),
    --Computer Science Fundamental Courses
    ('Discrete Structures', 'CS', 1800, NULL, 'Formal/Quant Reasoning', 4),
    ('Fundamentals of Computer Science 1', 'CS', 2500, NULL,  'Formal/Quant Reasoning,Natural/Designed World', 4),
    ('Fundamentals of Computer Science 2', 'CS', 2510, 15, 'Analyzing/Using Data,Natural/Designed World', 4),
    --Computer Science Required Courses
    ('Algorithms and Data', 'CS', 3000, 16, 'Formal/Quant Reasoning', 4),
    ('Object-Oriented Design', 'CS', 3500, 16, 'Analyzing/Using Data,Natural/Designed World', 4),
    ('Computer Systems', 'CS', 3650, 16, NULL, 4),
    ('Theory of Computation', 'CS', 3800, 18, NULL, 4),
    ('Software Development', 'CS', 4500, 18, 'Writing Intensive',  4),
    ('Fundamentals of Software Engineering', 'CS', 4530, 18, 'Writing Intensive',  4),
    --Concentration in Artificial Intelligence
    ('Artificial Intelligence', 'CS', 4100, 18, 'Capstone Experience,Writing Intensive', 4),
    ('Natural Language Processing', 'CS', 4120, 18, NULL, 4),
    ('Game Artificial Intelligence', 'CS', 4150, 18, 'Capstone Experience,Writing Intensive',  4),
    ('Reinforcement Learning', 'CS', 4180, NULL, 17,  4),
    ('Robotic Science and Systems', 'CS', 4610, 18, NULL, 4),
    --Concentration in Foundations
    ('Logic and Computation', 'CS', 2800, 14, NULL,  4),
    ('Fundamentals of Complexity Theory', 'CS', 4805, 20, NULL,  4),
    ('Introduction to Computer Science Research', 'CS', 3950, 15, NULL, 4),
    ('Advanced Algorithms', 'CS', 4810, 17, NULL, 4),
    ('Computer-Aided Reasoning', 'CS', 4820, 28, 'Capstone Experience', 4),
    ('System Specification, Verification and Synthesis', 'CS', 4830, 17, NULL, 4),
    --Concentration in Human-Centered Computing
    ('Mobile Application Development', 'CS', 4520, 18, NULL, 4),
    ('Web Development', 'CS', 4550, 18, 'Capstone Experience,Writing Intensive', 4),
    --Concentration in Software
    ('Programming Languages', 'CS', 4400, 18, NULL, 4),
    ('Network Fundamentals', 'CS', 4700, 16, NULL, 4),
    ('Distributed Systems', 'CS', 4730, 19, NULL, 4),
    ('Programming in C++', 'CS', 3520, 15, NULL, 4),
    ('Compilers', 'CS', 4410, 36, 'Capstone Experience,Writing Intensive', 4),
    --Concentration in Systems
    ('Computer Graphics', 'CS', 4300, 16, 'Capstone Experience,Writing Intensive', 4),
    ('Non-Interactive Computer Graphics', 'CS', 4360, 75, NULL, 4),
    ('Mobile and Wireless Systems', 'CS', 4710, 16, NULL, 4);


UPDATE courses
SET seminar_number = 1802
WHERE course_number = 1800 AND department = 'CS';
UPDATE courses
SET lab_number = 2501
WHERE course_number = 2500 AND department = 'CS';
UPDATE courses
SET lab_number = 2511
WHERE course_number = 2510 AND department = 'CS';
UPDATE courses
SET lab_number = 3501
WHERE course_number = 3500 AND department = 'CS';
-------------------
--Cybersecurity
-------------------
INSERT INTO courses 
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Foundations of Cybersecurity', 'CY', 2550, NULL, NULL),
    ('Systems Security', 'CY', 3740, NULL, NULL),
    ('Network Security', 'CY', 4740, NULL, NULL),
    ('The Law, Ethics, and Policy of Data and Digital Technologies', 'CY', 4170, NULL, 'Ethical Reasoning,Writing Intensive'),
    ('Cyber law: Privacy, Ethics, and Digital Rights', 'CY', 5240, NULL, 'Ethical Reasoning,Writing Intensive'),
    ('Cryptography', 'CY', 4770, NULL, 'Formal/Quant Reasoning'),
    ('Security of Wireless and Mobile Systems', 'CY', 4760, NULL, NULL);
-- Data Science
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Foundations of Data Science', 'DS', 3000, 16, 'Analyzing/Using Data,Natural/Designed World'),
    ('Machine Learning and Data Mining 1', 'DS', 4400, 51, 'Analyzing/Using Data,Capstone Experience,Writing Intensive'),
    ('Machine Learning and Data Mining 2', 'DS', 4420, 52, 'Analyzing/Using Data,Capstone Experience,Writing Intensive'),
    ('Information Presentation and Visualization', 'DS', 4200, 16, 'Analyzing/Using Data,Writing Intensive');

-- English
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('First-Year Writing', 'ENGW', 1111, NULL, NULL),
    ('Advanced Writing in the Technical Professions', 'ENGW', 3302, 55, NULL),
    ('Interdisciplinary Advanced Writing in the Disciplines', 'ENGW', 3315, 55, NULL);
-- Earth and Environmental Science
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('Dynamic Earth', 'ENVR', 1200, NULL, 'Natural/Designed World', 1201),  
    ('History of Earth and Life', 'ENVR', 1202, NULL, 'Natural/Designed World', 1203),
    ('Earth Materials', 'ENVR', 2310, NULL, 'Writing Intensive', 2311),
    ('Earth Landforms and Processes', 'ENVR', 2340, 58, NULL, 2341),
    ('Geographic Information Systems', 'ENVR', 3300, 58, 'Analyzing/Using Data,Creative Express/Innov', 3301),
    ('Applied Hydrology', 'ENVR', 4500, 58, NULL, 'Analyzing/Using Data'),
    ('Ancient Marine Life', 'ENVR', 5242, NULL, NULL, 5243);

-- History
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('History of Technology', 'HIST', 2220, NULL, 'Difference/Diversity,Societies/Institutions'); 
-- Interdisciplinary Studies in Social Sciences and Humanities
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Photography: The City through Data, Texts, Maps, and Networks', 'INSH', 2102, NULL, 'Interpreting Culture,Societies/Institutions');
-- Information Science
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Knowledge in a Digital World', 'IS', 1300, NULL, 'Ethical Reasoning,Societies/Institutions'),
    ('Principles of Information Science', 'IS', 2000, NULL, 'Analyzing/Using Data'),
    ('Information Retrieval', 'IS', 4200, NULL, NULL),
    ('Human Computer Interaction', 'IS', 4300, NULL, NULL),
    ('Empirical Research Methods', 'IS', 4800, NULL, NULL);
-- Math
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Calculus 1 for Science and Engineering', 'MATH', 1341, NULL, 'Formal/Quant Reasoning'),
    ('Calculus 2 for Science and Engineering', 'MATH', 1342, 72, 'Formal/Quant Reasoning'),
    ('Introduction to Mathematical Reasoning', 'MATH', 1365, NULL, NULL),
    ('Linear Algebra', 'MATH', 2331, 73, NULL),
    ('Probability and Statistics', 'MATH', 3081, 73, 'Analyzing/Using Data');

-- Philosophy
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Technology and Human Values', 'PHIL', 1145, NULL, 'Ethical Reasoning,Societies/Institutions'),
    ('Knowledge in a Digital World', 'PHIL', 1300, NULL, 'Ethical Reasoning,Societies/Institutions');
-- Physics
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('Physics for Life Sciences 1', 'PHYS', 1145, NULL, 'Natural/Designed World', 1146),  
    ('Physics for Life Sciences 2', 'PHYS', 1147, 79, 'Natural/Designed World', 1148),
    ('Physics for Life Engineering 1', 'PHYS', 1151, 72, 'Natural/Designed World', 1152),
    ('Physics for Life Engineering 2', 'PHYS', 1155, 81, 'Natural/Designed World', 1156),
    ('Physics 1', 'PHYS', 1161, 72, 'Natural/Designed World', 1162),
    ('Physics 2', 'PHYS', 1165, 83, 'Natural/Designed World', 1166);
-- Psychology
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Cognition', 'PSYC', 3466, NULL, NULL); 
-- Sociology
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('The Twenty-First-Century Workplace', 'SOCL', 1280, NULL, 'Societies/Institutions'),
    ('Environment, Technology, and Society', 'SOCL', 2485, NULL, 'Societies/Institutions'),
    ('Technology and Society', 'SOCL', 4528, NULL, 'Difference/Diversity,Societies/Institutions');
-- Theatre
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Improvisation', 'THTR', 1125, NULL, 'Creative Express/Innov'),
    ('Introduction to Acting', 'THTR', 1130, NULL, 'Creative Express/Innov,Interpreting Culture'),
    ('Dynamic Presence: Theatre Training for Effective Interpersonal Interactions', 'THTR', 1180, NULL, 'Creative Express/Innov'),
    ('Acting for the Camera', 'THTR', 2345, NULL, NULL);