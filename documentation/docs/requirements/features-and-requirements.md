---
sidebar_position: 4
---

# Features and Requirements
## Functional Requirements

### Login and Access
* Users will need to log in to Canvas using their college credentials to access the Attendance Face Recognition (AFR) application
* Canvas courses will have the AFR app installed, allowing users to access AFR from the course navigation menu

### Picture Upload
* The AFR application will not recognize a student if there are no pictures of that user in the system
* The AFR application will let a new student upload images to add into its dataset. This allows AFR to recognize the student.
* After the student has uploaded images, AFR will allow the student to take attendance.

### Known Student
* Once the student launches AFR through Canvas, they are redirected to the AFR application home page. Here, they can mark their attendance using face recognition or view their attendance records.
* Once the professor launches AFR through Canvas, they are redirected to the AFR dashboard. Here, they can import their courses, view and resolve students' issues, set the schedule for their courses, and view attendance reports.

### Face Recognition
* When a student attempts to take attendance and they are recognized by AFR, they will receive a greeting message.
* When a student attempts to take attendance and they are not recognized by AFR, AFR will dispaly an error message indicating that they are not recognized.
* AFR can idenfity people who are trying to cheat the face recognition system, and will only accept the presence of live people.

### Help with issues
* If a student has issues recognizing their face after multiple attempts, they will be prompted with a "Report Issue" button. This will allow the student to submit an issue to the professor.
* The professor can view issues created by the students and confirm/deny their attendance based on the issue's contents.

### Settings
* The professor can set the days and time for attendance to be open for each class they are teaching.
* AFR will import this information and automatically open attendance for students at the specified times.

### Reports
* Students will be able to view their attendance report from the reports page on their version of the AFR application.
* Professors will be able to view students' attendance reports for any course and section they are teaching.
* Attendance reports will show the status of student attendance. Students can either be present, late, or absent.

### Canvas Integration
* Professors will be able to import all of their courses, sections, and students into AFR.
* Professors will be able to update their courses on AFR if new sections become necessary or if new students are added.
* The AFR application will automatically create attendance assignments for each class the professor is teaching once the professor logs in.
* When a student takes attendance, the AFR application will automatically update their attendance grade on Canvas.

## Non-Functional Requirements
* The AFR application will have a very simple and user-friendly interface, with just a few tabs and buttons to mark attendance and view records. The student data will be secure, as it is integrated with Canvas. The buttons will be used to notify or alert when required.
* The AFR application must be added to a Canvas course in order to use it for that course. Installation instructions will be provided for professors to install the AFR application into their courses.
