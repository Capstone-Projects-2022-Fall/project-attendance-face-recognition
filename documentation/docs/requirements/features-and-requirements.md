---
sidebar_position: 4
---

# Features and Requirements
## Functional Requirements
### Students

#### Login and Access
* Any student user will need to login to canvas using their college credentials to access the attendance recognition system application
* Canvas will have the Attendance Face Recognition application installed into the course, letting the users access it from the navigation menu in the course
* Installation instructions will be provided for the admins to install the AFR application into the canvas courses

#### Picture Upload

* The attendance recognition application will not recognize a new student user if there is no data of the user in the system
* Attendance Face Recognition application will let a user, who is a new student upload a few pictures to add into dataset, for the application to recognize the student user
* After the upload is successful, the new student can take attendance in the application normally

### Known Students

* The user will be redirected to the AFR application home page once they access the application through canvas and they could choose to mark their attendance using face recognition or view their attendance records
* If the student has issues recognizing their face after multiple tries, there is a button 'report an issue' that notifies there is an issue and can sends their manually captured pictures to the professor

### Professors

1. Professors need to login to canvas  and click on attendance on the navigation bar on the left hand side which takes them to the application home page and select what class they want to manage or view attendance for from the list of their classes
2. On the first class during setup, they can set the timing for the attendance to be open on the days of the class
3. The 'records' tab in the left navigation bar of the application will show the attendance reports of the students of that class
4. The 'issues' tab in in the navigation bar will show the issues notified by the students to record attendance (which is also notified by email)
5. In the issues tab, they can click on an issue and review it and manually make necessary adjustments
6. From the records, they can manually modify the attendance if any changes are required

## Non-Functional Requirements

* This application will have a very simple and very user-friendly interface with just couple tabs and buttons on the pages to mark attendance and view the record. The student data will be secure as it is integrated with canvas. The buttons will also be used to notify or alert when needed.
