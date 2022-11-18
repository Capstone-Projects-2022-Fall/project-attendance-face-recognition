---
sidebar_position: 1
---

**Purpose**

The Design Document - Part I Architecture describes the software architecture and how the requirements are mapped into the design. This document will be a combination of diagrams and text that describes what the diagrams are showing.

**Requirements**

The Design Document - Part I Architecture will contain:

A description the different components and their interfaces. For example: client, server, database.

For each component provide class diagrams showing the classes to be developed (or used) and their relationship.

## UML Class Diagram
```mermaid
classDiagram
    User "1" <|-- "1" Student
    User "1" <|-- "1" Instructor
    User "1" *-- "1" CanvasToken
    Section "1" --* "1..*" Schedule
    Course "1" --* "1..*" Section
    Instructor -- Section
    Student "*" -- "1" Section
    Student "1" --* "1..*" StudentImage
    AttendanceSetting "1" *-- "1" Section
    Attendance "1..*" *-- "1" Student
    Section --* Attendance
    Student "1" --* "0..*" Issue
    Section --* Issue
    class CanvasUtil{
        -String API_URL
        -String client_id
        -String client_secret
        +getUserAndCanvasToken(canvas_code) User
        +getCanvasToken(canvas_course_id) Course
        +getCourseInfo(canvas_course_id, user) Course
        +isTeacher(user) bool
        +addingStudentToCourse(user)
        +currentCanvasCourse(user) Course
    }
    class User{
        -String first_name
        -String last_name
        -String email
        -String username
        +is_active() bool
    }
    class Student{
        -String canvasId
        +__str__() String
    }
    class Instructor{
        -String canvasId
        +__str__() String
    }
    class CanvasToken{
        -String accessToken
        -String refreshToken
        -int expires
        -date created
        +is_valid() bool
    }
    class Issue{
        -Student student
        -Section section
        -bool status
        -Date created
        -Date modified
        -String subject
        -String message
        +__str__() String
    }
    class Attendance{
        -date recordedDate
        -time recordedTime
        -String status
        -Section section
        -Student student
        +studentName() String
        +displayCourse() String
        +displaySection() String
        +__str__() String
    }
    class Course{
        -String canvasId
        -String name
        -String course_number
        -date start_date
        -date end_date
        +__str__() String
    }
    class Section{
        -String canvasId
        -String name
        -Course course
        -Instructor instructor
        -date end_date
        -List~Student~ students
        +__str__() String
    }
    class Schedule{
        -int weekday
        -time start_time
        -time end_time
        -Section section
        +dayOfWeek() String
        +__str__() String
    }
    class AttendanceSetting{
        -int duration
        -Section section
    }
    class StudentImage{
        -File imageFile
        -String encoding
        -Student student
        +__str__() String
    }
```

## Entity-Relation Diagram
![image](https://user-images.githubusercontent.com/78066498/192671782-2cae73c6-6593-458a-8f64-0bf4d66199cd.png)

## Sequence Diagrams

### Sequence Diagram for Use Case #1

1. User Story:
As a new student using the attendance face recognition system for the first time, I want to access the attendance.<br/>

Use Case:
- If the user is a new student, they login to canvas using their credentials
- They click on attendance from the navigation menu on the left
- They authorize the access of the AFR application
- They then upload a few pictures of themself to add to the data set
- Once finished, they can go to home and click on take attendance
- The student gives permission for the application to use the camera and record their attendance
- Once the attendance is recorded, they can exit out of the application

![image](https://user-images.githubusercontent.com/78066498/202630882-41135da7-6cad-44c1-980e-d2a2ce7c9714.png)

### Sequence Diagram for Use Case #2

2.	User story:
As an enrolled student, I can directly login through canvas and use it for attendance.<br/>

Use case:
-	If the user is a student, they login to canvas using their credentials
- They click on attendance from the navigation menu on the left
- The student clicks on take attendance
- The student gives permission for the application to use the camera
-	The student looks at the camera
-	The system matches the face
-	The system marks the attendance as present

![image](https://user-images.githubusercontent.com/78066498/202631011-cf16caf1-5d68-4f2b-ac15-69d6f90d94bd.png)

### Sequence Diagram for Use Case #3

3. User Story: 
As a student, if I’m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know that I'm in class.<br/>

Use Case:
If the user is a student, they login to canvas using their credentials
- They click on attendance from the navigation menu on the left
- The student clicks on take attendance
- The student gives permission for the application to use the camera
-	Then the student looks at the camera to record the attendance
-	The system has trouble recognizing the student and displays error message, even after multiple tries
-	The student then clicks the ‘Need Help’ button to report the issue to the professor
-	The professor gets notified that the specific student user has an issue marking their attendance

![image](https://user-images.githubusercontent.com/78066498/202631114-4e994c38-bfea-42d6-8a70-392894291a18.png)

### Sequence Diagram for Use Case #4

4.	User story:
As a professor, I want to have attendance taken automatically at a specific time of the class.<br/>
 Use case:
-	An admin user signs in through canvas
-	They click on attendance from the navigation menu on the left
-	As they are redirected to the home page, they select the desired class
-	Next, they set a recurring days and time for attendance during beginning of the semester
-	The system opens the attendance automatically to each student for that set time every class

![image](https://user-images.githubusercontent.com/78066498/202631232-12debbdd-9098-42c8-8299-2b8f3fb694dd.png)


### Sequence Diagram for Use Case #5

5.	User story:
As a professor, I want to have real time access of the attendance and get a report of the students’ attendance.<br/>

Use case: 
-	An admin user signs in through canvas
-	They click on attendance from the navigation menu on the left
-	As they are redirected to the home page and once the class is finished, they click on the 'Reports' tab
-	Then they select a specific class to view the report
-	Once selected, the report can be seen
-	If they want to make any adjustments, they can click on ‘Record manually’ to make changes

![image](https://user-images.githubusercontent.com/78066498/202640301-03a226f6-498d-42a0-bf19-2269637ae04c.png)

### Sequence Diagram for Use Case #6

6. User Story:
As a professor, I want to be notified/informed if any student has issues taking attendance.<br/>

Use Case:
-	An admin user signs in through canvas
-	They click on attendance from the navigation menu on the left
-	As they are redirected to the home page, they click on the 'Issues' tab
-	They can see the issues reported by the students from different classes and sections
-	They can click to view the issues

![image](https://user-images.githubusercontent.com/78066498/202643225-f105aea1-802d-41de-8670-f320cc5b05ac.png)
