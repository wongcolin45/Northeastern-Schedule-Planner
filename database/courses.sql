CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name TEXT DEFAULT NULL,
    department TEXT DEFAULT NULL,
    course_number INTEGER DEFAULT NULL,
    prerequisite INTEGER DEFAULT NULL, 
    lab_number INTEGER DEFAULT NULL, 
    seminar_number INTEGER DEFAULT NULL,
    attributes TEXT DEFAULT NULL,
    credits INTEGER DEFAULT 4
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
    ('General Biology 1', 'BIOL', 1111, NULL, NULL, 1112),
    ('General Biology 2', 'BIOL', 1113, NULL, NULL, 1114),
    ('Genetics and Molecular Biology','BIOL', 2301, NULL, NULL, 2302);
   
    
-------------------
--Chemistry 
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('General Chemistry for Science Majors', 'CHEM', 1161, NULL, NULL, 1162),  
    ('General Chemistry 1', 'CHEM', 1211, NULL, NULL, 1212),
    ('General Chemistry 2', 'CHEM', 1214, NULL, NULL, 1216);
-------------------
--Communications 
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Public Speaking', 'COMM', 1112, NULL, NULL),
    ('Business and Professional Speaking', 'COMM', 1113, NULL, NULL),
    ('Persuasion and Rhetoric','COMM', 1210, NULL, NULL),
    ('Communication and Storytelling','COMM', 1511, NULL, NULL);
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
    ('Discrete Structures', 'CS', 1800, NULL, NULL, 4),
    ('Fundamentals of Computer Science 1', 'CS', 2500, NULL, NULL, 4),
    ('Fundamentals of Computer Science 2', 'CS', 2510, NULL, NULL, 4),
    --Computer Science Required Courses
    ('Algorithms and Data', 'CS', 3000, NULL, NULL, 4),
    ('Object-Oriented Design', 'CS', 3500, NULL, NULL, 4),
    ('Computer Systems', 'CS', 3650, NULL, NULL, 4),
    ('Theory of Computation', 'CS', 3800, NULL, NULL, 4),
    ('Software Development', 'CS', 4500, NULL, NULL,  4),
    ('Fundamentals of Software Engineering', 'CS', 4530, NULL, NULL,  4),
    --Concentration in Articial Intelligence
    ('Artificial Intelligence', 'CS', 4100, NULL, NULL, 4),
    ('Natural Language Processing', 'CS', 4120, NULL, NULL, 4),
    ('Game Artificial Intelligence', 'CS', 4150, NULL, NULL,  4),
    ('Reinfrocement Learning', 'CS', 4180, NULL, NULL,  4),
    ('Robotic Science and Systems', 'CS', 4610, NULL, NULL, 4),
    --Concentration in Foundations
    ('Logic and Computation', 'CS', 2800, NULL, NULL,  4),
    ('Fundamentals of Complexity Theory', 'CS', 4805, NULL, NULL,  4),
    ('Introduction to Computer Science Research', 'CS', 3950, NULL, NULL, 4),
    ('Advanced Algorithms', 'CS', 4810, NULL, NULL, 4),
    ('Computer-Aided Reasoning', 'CS', 4820, NULL, NULL, 4),
    ('System Spcification, Verification and Synthesis', 'CS', 4830, NULL, NULL, 4),
    --Concentration in Human-Centered Computing
    ('Mobile Application Development', 'CS', 4520, NULL, NULL, 4),
    ('Web Development', 'CS', 4550, NULL, NULL, 4),
    --Concentration in Software
    ('Programming Languages', 'CS', 4400, NULL, NULL, 4),
    ('Network Fundamentals', 'CS', 4700, NULL, NULL, 4),
    ('Distributed Systems', 'CS', 4730, NULL, NULL, 4),
    ('Programming in C++', 'CS', 3520, NULL, NULL, 4),
    ('Compilers', 'CS', 4410, NULL, NULL, 4),
    --Concentration in Systems
    ('Computer Graphics', 'CS', 4300, NULL, NULL, 4),  
    ('Non-Interactive Computer Graphics', 'CS', 4360, NULL, NULL, 4),      
    ('Mobile and Wireless Systems', 'CS', 4710, NULL, NULL, 4);    


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
    ('Foundations of Cybersecruity', 'CY', 2550, NULL, NULL),
    ('Systems Security', 'CY', 3740, NULL, NULL),
    ('Network Security', 'CY', 4740, NULL, NULL),
    ('The Law, Ethics, and Policy of Data and Digital Technologies', 'CY', 4170, NULL, NULL),
    ('Cyberlaw: Privacy, Ethics, and Digital Rights', 'CY', 5240, NULL, NULL),
    ('Cryptography', 'CY', 4770, NULL, NULL),
    ('Security of Wireless and Mobile Systems', 'CY', 4760, NULL, NULL);
-------------------
--Data Science
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Foundations of Data Science', 'DS', 3000, NULL, NULL),
    ('Machine Learning and Data Mining 1', 'DS', 4400, NULL, NULL),
    ('Machine Learning and Data Mining 2', 'DS', 4420, NULL, NULL),
    ('Information Presentation and Visualization', 'DS', 4200, NULL, NULL);
---------------------------------------------------
--Electrical Engineering and Computer Engineering
---------------------------------------------------
INSERT INTO courses
    (course_name, department, course_number, lab_number, prerequisite, attributes)
VALUES
    ('Introduction to Digital Design and Computer Architecture', 'EECE', 2310, 2311, NULL, NULL);
-------------------
--English
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('First-Year Writing', 'ENGW', 1111, NULL, NULL),
    ('Advanced Writing in the Technical Professions', 'ENGW', 3302, NULL, NULL),
    ('Interdisciplinary Advanced Writing in the Disciplines', 'ENGW', 3315, NULL, NULL);
--------------------------------------
--Earth and Environmental Science
--------------------------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('Dynamic Earth', 'ENVR', 1200, NULL, NULL, 1201),  
    ('History of Earth and Life', 'ENVR', 1202, NULL, NULL, 1203),
    ('Earth Materials', 'ENVR', 2310, NULL, NULL, 2311),
    ('Earth Landforms and Processes', 'ENVR', 2340, NULL, NULL, 2341),
    ('Geographic Information Systems', 'ENVR', 3300, NULL, NULL, 3301),
    ('Applied Hydrogeology', 'ENVR', 4500, NULL, NULL, 4501),
    ('Ancient Marine Life', 'ENVR', 5242, NULL, NULL, 5243);
-------------------
--History
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('History of Technology', 'HIST', 2220, NULL, NULL); 
----------------------------------------------------------------
--Interdisciplinary Studies in Social Sciences and Humanities
----------------------------------------------------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Bostonography: The City through Data, Texts, Maps, and Networks', 'INSH', 2102, NULL, NULL); 
-----------------------
--Information Science
-----------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Knowledge in a Digital World', 'IS', 1300, NULL, NULL),
    ('Principles of Information Science', 'IS', 2000, NULL, NULL),
    ('Information Retrieval', 'IS', 4200, NULL, NULL),
    ('Human Computer Interaction', 'IS', 4300, NULL, NULL),
    ('Empirical Research Methods', 'IS', 4800, NULL, NULL);
-------------------
--Math
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Calculus 1 for Science and Engineering', 'MATH', 1341, NULL, NULL),
    ('Calculus 2 for Science and Engineering', 'MATH', 1342, NULL, NULL),
    ('Introduction to Mathematical Reasoning', 'MATH', 1365, NULL, NULL),
    ('Linear Algebra', 'MATH', 2331, NULL, NULL),
    ('Probability and Statistics', 'MATH', 3081, NULL, NULL);

-------------------
--Philosphy
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Technology and Human Values', 'PHIL', 1145, NULL, NULL),
    ('Knowledge in a Digital World', 'PHIL', 1300, NULL, NULL);
-------------------
--Physics
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes, lab_number)
VALUES
    ('Physics for Life Sciences 1', 'PHYS', 1145, NULL, NULL, 1146),  
    ('Physics for Life Sciences 2', 'PHYS', 1147, NULL, NULL, 1148),  
    ('Physics for Life Engineering 1', 'PHYS', 1151, NULL, NULL, 1152),  
    ('Physics for Life Engineering 2', 'PHYS', 1155, NULL, NULL, 1156),
    ('Physics 1', 'PHYS', 1161, NULL, NULL, 1162),
    ('Physics 2', 'PHYS', 1165, NULL, NULL, 1166);
-------------------
--Psychology
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Cognition', 'PSYC', 3466, NULL, NULL); 
-------------------
--Sociology
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('The Twenty-First-Century Workplace', 'SOCL', 1280, NULL, NULL),
    ('Environment, Technology, and Society', 'SOCL', 2485, NULL, NULL),
    ('Technology and Society', 'SOCL', 4528, NULL, NULL);
-------------------
--Theatre
-------------------
INSERT INTO courses
    (course_name, department, course_number, prerequisite, attributes)
VALUES
    ('Improvisation', 'THTR', 1125, NULL, NULL),
    ('Introduction to Acting', 'THTR', 1130, NULL, NULL),
    ('Dynamic Presence: Thetre Training for Effective Interpersonal Ineractions', 'THTR', 1180, NULL, NULL),
    ('Acting for the Camera', 'THTR', 2345, NULL, NULL);