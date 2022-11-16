---
sidebar_position: 1
---

**Purpose**

The Design Document - Part I Architecture describes the software architecture and how the requirements are mapped into the design. This document will be a combination of diagrams and text that describes what the diagrams are showing.

**Requirements**

The Design Document - Part I Architecture will contain:

A description the different components and their interfaces. For example: client, server, database.

For each component provide class diagrams showing the classes to be developed (or used) and their relationship.

Describe algorithms employed in your project, e.g. neural network paradigm, training and training data set, etc.

A check list for architecture design is attached here [architecture\_design\_checklist.pdf](https://templeu.instructure.com/courses/106563/files/16928870/download?wrap=1 "architecture_design_checklist.pdf")  and should be used as a guidance.

## UML Class Diagram
![image](https://user-images.githubusercontent.com/78066498/192671179-b13a4c35-04a5-497a-8777-96beaa4c6744.png)

## Entity-Relation Diagram
![image](https://user-images.githubusercontent.com/78066498/192671782-2cae73c6-6593-458a-8f64-0bf4d66199cd.png)

## Sequence Diagrams

### Sequence Diagram for Use Case #1
![image](https://user-images.githubusercontent.com/78066498/192402371-df135234-e90f-4f52-bed1-8529693a1981.png)
1.	User story:
As a professor, I want to have attendance taken automatically at a specific time of the class.
Use case:
- An admin user signs in through canvas
- They click on attendance from the navigation menu on the left
- As they are redirected to the home page, they select the desired class
- Next, they set a recurring days and time for attendance during beginning of the semester
- The system opens the attendance automatically to each student for that set time every class

### Sequence Diagram for Use Case #2
![image](https://user-images.githubusercontent.com/78066498/192402541-19ed10a9-935e-4e43-b73e-033c98cdb08b.png)
2.	User story:
As an enrolled student, I can directly login through canvas and use it for attendance.
Use case:
- If the student already is registered for the application, they can login directly using their credentials
- If the user is a student, they login to canvas using their credentials
- They receive and access the link from professor
- The student clicks on take attendance
- The student gives permission for the application to use the camera
- The student looks at the camera
- The system matches the face
- The system marks the attendance as present

### Sequence Diagram for Use Case #3
![image](https://user-images.githubusercontent.com/78066498/192679265-ce3a0ba6-12c6-4176-9f41-ee93a66ed3ff.png)
3.	User story:
As a professor, I want to have real time access of the attendance and adjust anything if needed and get report of students’ attendance.
Use case: 
- An admin user signs in through canvas
- They click on attendance from the navigation menu on the left
- As they are redirected to the home page and once the class is finished, they click on the 'Reports' tab
- Then they select a specific class to view the report
- Once selected, the report can be seen
- If they want to make any adjustments, they can click on ‘Record manually’ to make changes

### Sequence Diagram for Use Case #4
![image](https://user-images.githubusercontent.com/17518043/192659155-39a491aa-2339-4616-b64e-af07909343e4.png)
4. User Story: 
As a student, if I’m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know my trouble.
Use Case:
- They click on attendance from the navigation menu on the left
- The student clicks on take attendance
- The student gives permission for the application to use the camera
- Then the student looks at the camera to record the attendance
- The system has trouble recognizing the student and displays error message, even after multiple tries
- The student then clicks the ‘Need Help’ button to report the issue to the professor
- The professor gets notified that the specific student user has an issue marking their attendance

### Sequence Diagram for Use Case #5
![image](https://user-images.githubusercontent.com/17518043/192659169-8855818d-9fef-483e-b140-d9892e951a60.png)
5. User Story:
As a new student using the attendance system for the first time, I want the access the attendance.
Use Case:
- If the user is a new student, they login to canvas using their credentials
- They click on attendance from the navigation menu on the left
- They authorize the access of the AFR application
- They then upload a few pictures of themself to add to the data set
- Once finished, they can go to home and click on take attendance
- The student gives permission for the application to use the camera and record their attendance
- Once the attendance is recorded, they can exit out of the application

### Sequence Diagram for Use Case #6
![image](https://user-images.githubusercontent.com/78066498/192679337-da45d591-8f20-4a3c-8242-172cd9b54b09.png)
6. User Story:
As a professor, I want the system to send automatic links for every class.
Use Case:
- An admin user signs in
- They set up automatic link generation
- They then schedule the link to send during the days of the class at a specific time
- The professor saves this setting and now the links are sent automatically
