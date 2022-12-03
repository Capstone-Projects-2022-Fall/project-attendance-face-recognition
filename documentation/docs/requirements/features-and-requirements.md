---
sidebar_position: 4
---

# Features and Requirements
## Functional Requirements

### Login and Access
* Users will need to log in to Canvas using their college credentials to access the Attendance Face Recognition (AFR) application.
* Canvas courses will have the AFR app installed, allowing users to access AFR from the course navigation menu.

### Picture Upload
* The AFR application will not recognize a student if there are no pictures of that user in the system.
* The AFR application will let a new student user upload images to add into its dataset. This allows AFR to recognize the student going forward.
* After the student has uploaded 5 images, AFR will allow that student to take attendance.

### Known Student
* Once the student launches AFR through Canvas, they are redirected to the AFR application home page. Here, they can mark their attendance using face recognition by clicking on the 'take attendance' button or view their attendance records.
* Once the instructor launches AFR through Canvas, they are redirected to the AFR dashboard. Here, they can import their courses, set a schedule for the imported courses, view and resolve students' issues, and view attendance reports of their course.

### Face Recognition
* When a student attempts to take attendance and they are recognized by AFR, they will be marked as present and a button to return to the home page will pop up.
* When a student attempts to take attendance and they are not recognized by AFR, AFR will display an error message indicating that they are not recognized. A button will then appear to start again for five more tries.
* AFR can idenfity people who are trying to cheat the face recognition system, and will only accept the presence of live people. This will be done by providing randomized emotions the user must perform on the camera. Emotions will be randomized between attempts additionally.

### Help with issues
* If a student has issues having their face recognized after multiple attempts, they will be prompted with a "Report Issue" button. This will allow the student to submit an issue to the instructor.
* The field for the submit issue form will be simple, including just a subject line and body text field.
* The instructor can then view issues created by their students and accept/reject their attendance based on the issue's contents.

### Canvas Integration & Automatic Grading
* Instructors will be able to import all of their courses, sections, and students into AFR.
* Instructors will be able to update their courses on AFR if new sections become necessary or if new students are added.
* AFR will be able to create an attendance assignment in Canvas for the instructor the first time AFR is launched. If an attendance assignment already exists, it will not be created.
* The grading in Canvas will be out of 100 points.
* When a student takes attendance, their grade will automatically be configured in Canvas to represent if they were present, late, or absent.
* If an instructor approves a student issue, the student's grade in Canvas will be automatically adjusted as well.

### Scheduler
* Instructors will be able to assign a schedule to each course section in AFR.
* For each schedule, the instructor must provide the days of the week, class start time, and class end time.
* AFR will import this information and automatically open attendance for students at the specified times.

### Reports
* Students will be able to view their attendance report from the reports page on their version of the AFR application.
* Instructors will be able to view students' attendance reports for any course and section they are teaching.
* Attendance reports will show the status of student attendance. Students can either be present, late, or absent.

## Non-Functional Requirements
* The AFR application will have a very simple and user-friendly interface, with just a few tabs and buttons to mark attendance and view records. The student data will be secure, as it is integrated with Canvas. The buttons will be used primarily for navigation.
* The AFR application must be added to a Canvas course in order to be used for that course. Installation instructions will be provided for professors to install the AFR application into their courses.
