---
sidebar_position: 4
---

# Features and Requirements
## Functional Requirements

### Login and Access
* Any user will need to login to canvas using their college credentials to access the attendance recognition system application
* Canvas will have the Attendance Face Recognition application installed into the course, letting the users access it from the navigation menu in the course

### Picture Upload
* The attendance recognition application will not recognize a new student user if there is no data of the user in the system
* Attendance Face Recognition application will let a user, who is a new student upload a few pictures to add into dataset, for the application to recognize the student user
* After the upload is successful, the new student can take attendance in the application normally

### Known User
* The user will be redirected to the AFR application home page once they access the application through canvas and they could choose to mark their attendance using face recognition or view their attendance records

### Face Recognition
* When a student user tries to take attendance, and the system recognizes them, they will be notified by a greeting message. At the same time, if the user is not recognized, AFR will display an error message that they are not recognized
* AFR can identify people who are trying to cheat to mark their attendance and only accepts the presence of live people infront of the webcam

### Help with issues
* If the student user has issues recognizing their face after multiple tries, there is a button 'report an issue' that notifies there is an issue and can send their manually captured pictures to the professor
* Professor would be able to see the issues created by the students and manage the attendance based on the issues reported

### Settings
* On the first class during setup, the professor can set the days and time for the attendance to be open on the days for the class

### Reports
* Student user will be able to view their attendance report from the reports page on the application for their class
* Professor will be able to view the attendance report of their students for any specifc class and section
* The attendance report also shows the status of student attendance as present, late, or absent

## Non-Functional Requirements

* Attendance Face Recognition application will have a very simple and very user-friendly interface with just couple tabs and buttons on the pages to mark attendance and view the record. The student data will be secure as it is integrated with canvas. The buttons will also be used to notify or alert when needed.
* AFR application must be added into the canvas course to use it for any course. Installation instructions will be provided for the admins to install the AFR application into the canvas courses
