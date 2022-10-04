---
sidebar_position: 5
---

# Use-case descriptions

## Professor
1.	User story:
As a professor, I want to have attendance taken automatically at a specific time.
Use case:
-	An admin user signs in
-	They select the desired class
-	Next, they set a recurring time for attendance during beginning of the semester
-	The system sends a link automatically to each student for that set time every class

2.	User story:
As a professor, I want to have real time access of the attendance and adjust anything if needed and get a report of the students’ attendances.
Use case: 
-	An admin user signs in
-	An automatic link is sent to students to record their attendance
-	Once the class is finished, they go to their account, and click on the ‘View Report’ tab
-	Then they select a specific class to view the report
-	Once selected, the report can be seen
-	If they want to make any adjustments, they can click on ‘Record manually’ to make changes

3. User Story:
As a professor, I want the system to send an automatic link every class to the students.
Use Case:
- An admin user signs in
- They set automatic link generation
- They then schedule the link to send during the days of the class and time
- They save it within the application and now the links are sent automatically

## Student

1.	User story:
As an enrolled student, I can directly login through canvas and use it for attendance.
Use case:
-	If the user is a student, they receive and access the link from professor
-	If the student already is registered for the application, they can login directly using their credentials
-	The student looks at the camera
-	The system matches the face
-	The system marks the attendance as present

2. User Story: 
As a student, if I’m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know that I'm in class.
Use Case:
-	If the user is a student, they receive and access the link
-	They login directly to the application using credentials
-	Then the student looks at the camera to record the attendance
-	The system has trouble recognizing the student even after multiple tries
-	The student then clicks the ‘Need Help’ button to report the issue to the professor
-	The professor gets notified that the specific student user has an issue marking their attendance

3. User Story:
As a new student using the attendance system for the first time, I want to access the attendance.
Use Case:
- If the user is a new student, they login to canvas
- They access attendance system through a link
- They then have the option to either upload or capture a picture of themself to add to the data set
- Once finished, they can go ahead and record their attendance by scanning their face
- Once the attendance is recorded, they can exit out of the application
