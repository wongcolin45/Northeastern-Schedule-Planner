


--1) Get Requirements:
SELECT DISTINCT requirement_name
FROM cs_requirements;
--SHOULD GET:
--Store in Requirements = [ Computer Science Requirements, Supporting Courses, Computer Science Writing Requirements ]


--2) Iterate over Requirements to get subsections
--For requirement in requirement:
SELECT DISTINCT sub_requirement_name
FROM cs_requirements
WHERE requirement_name IS 'Computer Science Requirements';

SELECT DISTINCT sub_requirement_name
FROM cs_requirements
WHERE requirement_name IS 'Supporting Courses';

SELECT DISTINCT sub_requirement_name
FROM cs_requirements;
WHERE requirement_name IS 'Computer Science Writing Requirements';

--3 for each of those subections get the classes in them


SELECT courses.course_name
FROM cs_requirements
INNER JOIN courses
USING (course_id)
WHERE sub_requirement_name = 'Computer Science Overview';


--Return as obejct
--rqeuirement name = name of object
--subseciton willl be fileds, 