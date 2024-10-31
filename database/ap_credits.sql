
CREATE TABLE ap_credits (
    ap_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ap_course_name TEXT DEFAULT NULL,
    attributes TEXT DEFAULT NULL,
    course_id INTEGER DEFAULT NULL,
    course_id_2 INTEGER DEFAULT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    FOREIGN KEY (course_id_2) REFERENCES courses(course_id)
);

INSERT INTO ap_credits
    (ap_course_name, attributes, course_id)
VALUES
    ('African-American Studies','Difference/Diversity', NULL),
    ('2-D Art and Design','Creative Expression/Innovation', NULL),
    ('3-D Art and Design', NULL, NULL),
    ('Art Drawing','Creative Expression/Innovation', NULL),
    ('Art History', NULL, NULL),
    ('Biology','Natural/Designed World', 2),
    ('Calculus AB','Formal/Quant Reasoning', 72),
    ('Calculus BC','Formal/Quant Reasoning', 73),
    ('Chemistry','Natural/Designed World', 5),
    ('Chinese Language and Culture', NULL, NULL),
    ('Comparative Government and Politics', NULL, NULL),
    ('Computer Science A', NULL, NULL),
    ('Computer Science Principles', NULL, NULL),
    ('English Language and Composition','Writing in the First Year', 55),
    ('English Literature and Composition','Writing in the First Year', 55),
    ('Environmental Science','Natural/Designed World,Analyzing/Using Data', NULL),
    ('European History','Societies/Institutions,Difference/Diversity', NULL),
    ('French Language and Culture', NULL, NULL),
    ('German Language and Culture', NULL, NULL),
    ('Human Geography', NULL, NULL),
    ('Italian Language and Culture', NULL, NULL),
    ('Japanese Language and Culture', NULL, NULL),
    ('Latin', NULL, NULL),
    ('Macroeconomics','Societies/Institutions,Analyzing/Using Data', NULL),
    ('Microeconomics','Societies/Institutions,Analyzing/Using Data', NULL),
    ('Music Theory', NULL, NULL),
    ('Physics 1: Algebra-Based','Natural/Designed World,Analyzing/Using Data', 79),
    ('Physics 2: Algebra-Based','Natural/Designed World,Analyzing/Using Data', 80),
    ('Physics C: Electricity and Magnetism','Natural/Designed World,Analyzing/Using Data', 82),
    ('Physics C: Mechanics','Natural/Designed World, Analyzing/Using Data', 81),
    ('Psychology','Natural/Designed World,Societies/Institutions', NULL),
    ('Spanish Language and Culture', NULL, NULL),
    ('Statistics','Analyzing/Using Data', NULL),
    ('United States Government and Politics','Societies/Institutions', NULL),
    ('United States History','Interpreting Culture,Difference/Diversity', NULL),
    ('World History: Modern', NULL, NULL);


