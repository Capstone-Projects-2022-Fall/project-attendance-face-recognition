---
sidebar_position: 1
---

**Purpose**

The Design Document - Part I Architecture describes the software architecture and how the requirements are mapped into the design. This document will be a combination of diagrams and text that describes what the diagrams are showing.



## UML Class Diagram
Many of the classes illustrated in the UML class diagram represent models that define the source of information about AFR data. It includes a representation of the user, course, section, schedule, image, and tickets that will be used to generate a table in the AFR database. This will not be possible without this ORM feature provided by the Django framework. Even if these classes are placed in different apps in the project, they are all connected in a way to properly run the AFR Application. The other classes included in the application help in creating business logic in order to properly handle the information from Canvas and match it with the appropriate user.
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
        -String grader_access_token
        +getUserAndCanvasToken(canvas_code) User
        +getCanvasToken(canvas_course_id) Course
        +getCourseInfo(canvas_course_id, user) Course
        +isTeacher(user) bool
        +addingStudentToCourse(user)
        +currentCanvasCourse(user) Course
        +createAttendanceAssignments(canvas_code)
        +updateAttendanceScore(submittedCourse, submittedStudent)
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
The AFR database is an essential piece to allow this application to function. It consists of thirteen tables that store information about AFR's users and the courses found in Canvas for a particular user. A user can be either a student or a professor. Each user will have a stored token that will be created as the user first logs into the application. That token will be retrieved every time a user requests access to the application.
As a student, AFR stores a reference to the user id found in Canvas to retrieve and update any changes that was done on the Canvas platform. Since AFR is a face recognition application, a student has the possibility to store more than one encoded image which will facilitate the authentication of the user once he/she is trying to mark themselves PRESENT in a particular class. A special table called “attendance_Issue” will store any submitted ticket created by a student once there is a concern in taking attendance, such as if the application is unable to detect their face.
Students will not be able to explore AFR's complete features if their professor does not properly configure the section prior to the beginning of the semester. For the app to work accurately for each student, AFR stores all sections' configurations that will be retrieved once a student is trying to take attendance.

![newER_AFR](https://user-images.githubusercontent.com/17518043/202818573-e526e259-cc87-4fad-80e9-1daf42d2f5c5.png)


## Sequence Diagrams

### Sequence Diagram for Use Case #1

1. User Story:
As a new student using the attendance face recognition system for the first time, I want to access the attendance.<br/>

Use Case:
- If the user is a new student, they login to Canvas using their credentials
- They click on "Attendance Face Recognition" from the navigation menu on the left
- They authorize the access of the AFR application
- They then upload a few pictures of themself to add to the data set
- Once finished, they can go to the home page of AFR and click on 'take attendance'
- The student gives permission for the application to use their camera and record their attendance
- Once the attendance is recorded, they can exit out of the application

![image](https://user-images.githubusercontent.com/78066498/202630882-41135da7-6cad-44c1-980e-d2a2ce7c9714.png)

### Sequence Diagram for Use Case #2

2.	User story:
As an enrolled student, I can directly login through Canvas and use it for attendance.<br/>

Use case:
- If the user is a student, they login to Canvas using their credentials
- They click on "Attendance Face Recognition" from the navigation menu on the left
- The student clicks on 'take attendance'
- The student gives permission for the application to use their camera
- The student looks at the camera
- The system matches the face
- The system marks the student's attendance status as present

![image](https://user-images.githubusercontent.com/78066498/202631011-cf16caf1-5d68-4f2b-ac15-69d6f90d94bd.png)

### Sequence Diagram for Use Case #3

3. User Story: 
As a student, if I’m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know that I attended class.<br/>

Use Case:
- If the user is a student, they login to Canvas using their credentials
- They click on "Attendance Face Recognition" from the navigation menu on the left
- The student clicks on 'take attendance'
- The student gives permission for the application to use the camera
- Then the student looks at the camera to record their attendance
- The system has trouble recognizing the student and displays an error message, even after multiple tries
- The student then clicks the ‘Need Help’ button to report the issue to the professor
- The professor gets notified that the specific student user has an issue marking their attendance

![image](https://user-images.githubusercontent.com/78066498/202631114-4e994c38-bfea-42d6-8a70-392894291a18.png)

### Sequence Diagram for Use Case #4

4.	User story:
As a professor, I want to have attendance taken automatically at a specific time of the class.<br/>
 Use case:
- An admin user signs in through Canvas
- They click on "Attendance Face Recognition" from the navigation menu on the left
- As they are redirected to the professor view home page, they select their desired class
- Next, they set a class schedule with specific recurring days of the week, along with the class time and start/end dates for attendance during beginning of the semester
- The system opens the attendance automatically to each student for that set time every class

![image](https://user-images.githubusercontent.com/78066498/202631232-12debbdd-9098-42c8-8299-2b8f3fb694dd.png)


### Sequence Diagram for Use Case #5

5.	User story:
As a professor, I want to have real time access of the attendance and get a report of the students’ attendances.<br/>

Use case: 
- An admin user signs in through Canvas
- They click on "Attendance Face Recognition" from the navigation menu on the left
- As they are redirected to their home page and once the class is finished, they click on the 'Reports' tab
- Then they select a specific class for which to view the report
- Once selected, the attendance report can be seen
- If they want to make any adjustments, they can click on ‘Record manually’ to make changes

![image](https://user-images.githubusercontent.com/78066498/202640301-03a226f6-498d-42a0-bf19-2269637ae04c.png)

### Sequence Diagram for Use Case #6

6. User Story:
As a professor, I want to be notified/informed if any student has issues taking their attendance.<br/>

Use Case:
- An admin user signs in through Canvas
- They click on "Attendance Face Recognition" from the navigation menu on the left
- As they are redirected to the home page, they click on the 'Issues' tab
- They can see the issues reported by the students from different classes and sections
- They can click to view a student's issue

![image](https://user-images.githubusercontent.com/78066498/202643225-f105aea1-802d-41de-8670-f320cc5b05ac.png)

### Sequence Diagram for Use Case #7

7. User Story:
As a professor, I want a faster way to get attendance grades recorded into the gradebook.<br/>

Use Case:
- An admin user signs in through Canvas
- They click on "Attendance Face Recognition" from the navigation menu on the left at the beginning of the semester
- An attendance assignment is automatically created in the Canvas gradebook for every student user in the professor's class/section
- Once a student has taken their attendance through AFR, they recieve a grade automatically in Canvas
- The professor views the gradebook on Canvas after class
- They are then able to see attendance grades for all students without needing to enter grades themself

<br/><b/>Instructor Sequence Diagram:<b/><br/>

```mermaid
sequenceDiagram
  actor Instructor
  participant App
  participant Frontend_API
  participant GenerateAssignmentAPIView
  participant canvasUtils
  participant Canvas
  Instructor->>App: Logs On
  Note over App,Frontend_API: The body contains the Canvas code.
  App->>Frontend_API: createAttendanceAssignmentsAPI(body)
  Frontend_API->>GenerateAssignmentAPIView: POST: /api/v1/assignments(body)
  GenerateAssignmentAPIView->>canvasUtils: createAttendanceAssignments(body)
  canvasUtils->>Canvas: POST: /login/oauth2/token(body)
  Canvas-->>canvasUtils: Response: Access Token
  canvasUtils->>Canvas: Canvas.get_current_user(access_token)
  Canvas-->>canvasUtils: Response: User
  canvasUtils->>Canvas: user.get_courses()
  Canvas-->>canvasUtils: Response: User's Courses
  loop while user is not in response
    canvasUtils->>Canvas: get_users["ta", "teacher"]
    Canvas-->>canvasUtils: Response: Users in course
  end
  canvasUtils->>Canvas: course.get_assignments()
  Canvas-->>canvasUtils: Response: Assignments in course
  alt Attendance assignment found
    canvasUtils->>GenerateAssignmentAPIView: 
  end
  alt No attendance assignment found
    canvasUtils->>Canvas: create_assignment
    canvasUtils->>GenerateAssignmentAPIView: 
  end
  GenerateAssignmentAPIView-->>Frontend_API: Response (200 if OK, 400 if bad request)
  Instructor->>Canvas: View assignments
  Canvas-->>Instructor: Shows the attendance assignment
```

<br><b>Student sequence diagram:</b></br>
```mermaid
sequenceDiagram
  actor Student
  participant App
  participant Frontend_API
  participant AttendanceStudentAPIView
  participant canvasUtils
  participant Canvas
  Student->>App: Logs on
  Note over App,Frontend_API: Body=regular image, emotion image, emotion
  App->>Frontend_API: attendanceSubmissionAPI(body)
  Frontend_API->>AttendanceStudentAPIView: POST: /api/v1/attendance(body)
  Note over AttendanceStudentAPIView,canvasUtils: This is only called when the student is marked present.
  AttendanceStudentAPIView->>canvasUtils: updateAttendanceScore(course, student)
  canvasUtils->>Canvas: Canvas.get_current_user(grader_access_token)
  Canvas-->>canvasUtils: Response: Grader
  canvasUtils->>Canvas: user.get_courses()
  Canvas-->>canvasUtils: Response: Grader's courses
  loop until matching course for submitting student found
    canvasUtils->>canvasUtils: Check course
  end
  canvasUtils->>Canvas: get_assignments(matching course)
  Canvas-->>canvasUtils: Response: Course's assignments
  loop until matching assignment found
    canvasUtils->>canvasUtils: Check assignment
  end
  canvasUtils->>Canvas: get_submission(student's canvas ID)
  Canvas-->>canvasUtils: Response: Student's attendance submission
  Canvas->>Canvas: submission.edit(grade = grade + 1)
  canvasUtils->>AttendanceStudentAPIView: 
  AttendanceStudentAPIView->>Frontend_API: Response: 200 (OK)
  Student->>Canvas: View assignments
  Canvas-->>Student: Shows the autograded attendance assignment
```
