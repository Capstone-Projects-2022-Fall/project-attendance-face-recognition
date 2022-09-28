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
As a professor, I want to have attendance taken automatically.
Use case:
-	Admin user signs in
-	Select the desired class
-	Then they set the time for attendance once during beginning of the semester
-	The system sends links automatically to the students for that time every class day

### Sequence Diagram for Use Case #2
![image](https://user-images.githubusercontent.com/78066498/192402541-19ed10a9-935e-4e43-b73e-033c98cdb08b.png)
2.	User story:
As continuing student, I can directly login through canvas and use it for attendance.
Use case:
-	If the user is a student, they receive and access the link from professor
-	If the student already is registered for the application, they can login directly using their credentials
-	Student looks at the camera
-	The system matches the face
-	The system marks the attendance

### Sequence Diagram for Use Case #3
![image](https://user-images.githubusercontent.com/78066498/192679265-ce3a0ba6-12c6-4176-9f41-ee93a66ed3ff.png)
3.	User story:
As a professor, I want to have real time access of the attendance and adjust anything if needed and get report of students’ attendance.
Use case: 
-	Admin user signs in
-	Automatic link is sent to students to record their attendance
-	Once the class is done, they go to their account, click on ‘View Report’ tab
-	Then they select the specific class to view the report
-	Once selected, the report can be seen
-	If they want to make any adjustments, they can click on ‘Record manually’ to make changes

### Sequence Diagram for Use Case #4
![image](https://user-images.githubusercontent.com/17518043/192659155-39a491aa-2339-4616-b64e-af07909343e4.png)
4. User Story: 
As a student, if I’m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know my trouble.
Use Case:
-	If the user is student, they receive and access the link
-	They login directly to the application using credentials
-	Then the student looks at the camera to record the attendance
-	But the system has trouble recognizing the student even after multiple tries
-	Then the student clicks the ‘Need Help’ button to report the issue to the professor
-	Now the professor gets notified that the specific student user has issue marking attendance

### Sequence Diagram for Use Case #5
![image](https://user-images.githubusercontent.com/17518043/192659169-8855818d-9fef-483e-b140-d9892e951a60.png)
5. User Story:
As a new student using the attendance system for the first time, I want the access the attendance.
Use Case:
- If the user is new student, they login to canvas
- They access attendance system through a link
- They have option to either upload or capture picture of their's to add to data set
- Once finished, they can go ahead to record their attendance by scanning their face
- Once recorded, they can exit out of the application

### Sequence Diagram for Use Case #6
![image](https://user-images.githubusercontent.com/78066498/192679337-da45d591-8f20-4a3c-8242-172cd9b54b09.png)
6. User Story:
As a professor, I want to the system to send automatic links for every class.
Use Case:
- Admin user signs in
- They set automatic link generation
- Schedule the link to send during the days of the class and time
- Saves it and now the links are sent automatically
