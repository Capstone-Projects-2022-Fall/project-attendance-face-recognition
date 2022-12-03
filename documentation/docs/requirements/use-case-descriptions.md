---
sidebar_position: 5
---

# Use-case descriptions

## New Student
1. User Story:
As a new student using the attendance face recognition system for the first time, I want to access the attendance.

Use Case:
- If the user is a new student, they login to Canvas using their credentials
- They click on attendance from the navigation menu on the left
- They authorize the access of the AFR application
- They then upload a few pictures of themself to add to the data set
- Once finished, they can go to home and click on take attendance
- The student gives permission for the application to use the camera and record their attendance
- Once the attendance is recorded, they can exit out of the application

## Known Student
1.	User story:
As an enrolled student, I can access AFR from Canvas and use it to take attendance.

Use Case:
-	If the user is a student, they login to Canvas using their credentials
- They click on attendance from the navigation menu on the left
- The student clicks on take attendance
- The student gives permission for the application to use the camera
-	The student looks at the camera
-	The system matches the face
-	The system marks the attendance as present


2. User Story:
As a student, if I’m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know that I'm in class.

Use Case:
If the user is a student, they login to Canvas using their credentials
- They click on attendance from the navigation menu on the left
- The student clicks on take attendance
- The student gives permission for the application to use the camera
-	Then the student looks at the camera to record the attendance
-	The system has trouble recognizing the student and displays an error message
- The system allows the student to attempt to take attendance again using another random emotion
- The student attempts to take attendance again
- After 5 attempts, the system stops the student from submitting any more attendance attempts
- After 5 attempts, the student can click the "Report Issue" button to report an issue to the professor
- The student fills in the issue's subject and body and clicks the "Submit Issue" button
- The student is returned to the AFR Home page
-	The professor receives the issue and can view it in their AFR Home page


## Professor
1.	User story:
As a professor, I want to have attendance taken automatically at a specific class time.

Use case:
-	A professor signs in to AFR through Canvas
-	They click on "Course & Sections" to view the courses and sections they are teaching
-	They click on "Add Schedule for Class" to add a schedule
-	They select the section, weekday(s) the class is held, class start time, and class end time
- The system then opens attendance automatically to each student enrolled in that section at that time every time class is held


2.	User story:
As a professor, I want to have real time access of students' attendance and get a report of the students’ attendance.<br/>

Use case:
-	A professor signs in to AFR through Canvas
-	They click on attendance from the navigation menu on the left
-	As they are redirected to the home page and once the class is finished, they click on the 'Reports' tab
-	Then they select a specific class to view the report
-	Once selected, the report can be seen
-	If they want to make any adjustments, they can click on ‘Record manually’ to make changes


3. User Story:
As a professor, I want to be notified/informed if any student has issues taking attendance.

Use Case:
-	A professor signs in to AFR through Canvas
-	As they are redirected to the home page, they can see all issues reported by students from different classes and sections
-	They can choose which issues to accept (marking the attendance as present) and which issues to reject (marking the attendance as absent)
-	The system removes the issue once it has been accepted or rejected


4. User Story:
As a professor, I want attendance grades in Canvas to be automatically updated when attendance is taken.<br/>

Use Case:
 - A professor signs in to AFR through Canvas
 - As the professor is signing in, AFR will automatically create attendance assignments for all courses the professor is teaching if they did not exist already
 - Once a student has taken their attendance through AFR, their attendance grade will automatically be updated in Canvas
 - The professor can view the gradebook in Canvas to see attendance grades without having to import anything themselves


5. User story:
As a professor, I want to be able to import all sections for courses I am teaching, and the corresponding students for those sections, into AFR.

Use case:
 - A professor signs in to AFR through Canvas
 -	They click on "Course & Sections" to view the courses and sections they are teaching
 -	They click on "Sync with Canvas"
 -	The system automatically adds all sections, courses, and students that have logged onto AFR enrolled in those sections into AFR
 -	They can repeatedly sync as the semester progresses to continually add students as they log into AFR for the first time

