# Attendance Face Recognition
## Description
Attendance Face Recognition is a web application for face recognition as a biometric technique to track the attendance of students taking college courses as well as employees within a remote company. By utilizing built-in cameras that many laptops and mobile devices have nowadays, this application will identify and analyze each unique face within the span of the camera and match it with an image from the database. If the application does not identify the person, it will let the user (e.g., student, employee etc.) know about it and give multiple tries. If the user still has issues taking attendance, they could report the issue to the admin. The attendance report of users who were present, absent, or late will be generated for the admin. This application is currently designed to integrate with canvas platforms for colleges and could be modified to use them for other purposes.

## API Reference
* Base URL: 
  * local: http://localhost:5000/api/v1
  * online:
* Authentication: A token is required to run most of the endpoints. 

## Error Handling
The API will return four error types when requests fail:
* 400 : Bad Request
* 404 : Resource Not Found
* 401 : Unauthorized user
* 422 : Not Processable


## Endpoints
### Token
### POST /token/
* General:
  * Request access token
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/token/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'canvas_code=a494fde527ea9142856be0134344160fa232274646bf1008421769d394ad6...'```
* Response
  * code 200
  ```bash 
  {
    "access_token": "...",
  }
  ```
  * code 400 
  ```bash 
  {
    "access_token": "",
    "message": "Cound not identify user"
  }
  ```
  

### Professor
#### GET /
* General:
  * Return Initial request including info about the professor, current course, current section, registration, role, list of issues, students, schedule, and report
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
    ```bash
    {
    "user": {
        "id": 5,
        "first_name": "User",
        "last_name": "Admin",
        "username": "user@example.com",
        "email": "user@example.com"
    },
    "current_course": {
        "canvasId": "",
        "name": "",
        "course_number": "",
        "start_date": null,
        "end_date": null
    },
    "current_section": {
        "name": "",
        "canvasId": "",
        "course": null,
        "instructor": null,
        "students": []
    },
    "registration_completed": {
        "completed": true
    },
    "role_teacher": true,
    "issues": [],
    "students": [],
    "schedule": [
        {
            "id": 1,
            "course": "Project in Computer Science",
            "section": "001",
            "schedule": "Thursday:15:37:40 to 20:37:46; "
        }
    ],
    "report": []
    }
  * code 401
  ```
  {
    "detail": "Authentication credentials were not provided."
  }
  
### GET /assignments/
* General:
  * Automatically creates Attendance assignments for all classes the professor is teaching
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/assignments/' \
--header 'Authorization: Token...'```
* Response
  * code 200
  ```bash 
  {
    "message": "Assignments created!"
  }
  ```
  * code 400 
  ```bash 
  {
    "detail": "Could not create assignments."
  }
  ```

### GET /report/today/
* General:
  * Return View report of the day
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/report/today/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  {
    "today_report": [
        {
            "id": 5,
            "studentName": "Student, Testing",
            "recordedDate": "2022-11-18",
            "recordedTime": "19:50:46.497174",
            "status": "Absent",
            "displaySection": "001",
            "displayCourse": "Project in Computer Science"
        }
    ]
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```

### GET /statistics/attendance/
* General:
  * Return View detail attendance report of each month
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/statistics/attendance/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  {
    "present": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0
    ],
    "late": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    "absent": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0
    ]
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```

### GET /statistics/sections/
* General:
  * Return Number of student per section
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/statistics/sections/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  {
    "001": 1
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```

### GET /attendance/monitoring/
* General:
  * Return Show attendance report for current section
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/attendance/monitoring/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  {
    "attendance": [
        {
            "id": 1,
            "studentName": "Student, Testing",
            "recordedDate": "2022-11-17",
            "recordedTime": "22:04:19.940903",
            "status": "Present",
            "displaySection": "001",
            "displayCourse": "Project in Computer Science"
        },
        ...
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```

### GET /courses/
* General:
  * Return list of courses being taught by this instructor
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/courses/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  [
    {
        "id": 1,
        "canvasId": "2",
        "name": "Project in Computer Science",
        "course_number": "CIS 4398",
        "start_date": "2022-09-01",
        "end_date": "2022-12-15"
    },
    ...
  ]
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```
  
### POST /issue_approval/
* General:
  * Allows the instructor to approve selected student issues
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/issue_approval/' \
--header 'Authorization: Token ...'
--form 'issues_to_modify="issue_list"'```
* Response
  * code 200
  ```bash
  {
    "message": "Issues have been approved!",
    "completed": True
  }
  
### POST /issue_rejection/
* General
  * Allows the instructor to reject selected student issues
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/issue_rejection/' \
--header 'Authorization: Token ...'
--form 'issues_to_modify="issue_list"'```
* Response
  * code 200
  ```bash
  {
    "message": "Issues have been rejected!",
    "completed": True
  }
  
### POST /canvas_sync/
* General
  * Imports and updates courses, sections, and students associated with the instructor
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/canvas_sync/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash
  {
    "message": "Canvas has been synced!",
    "completed": True
  }
  
### POST /schedule_submission/
* General
  * Adds a schedule to the selected Canvas section
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/schedule_submission/' \
--header 'Authorization: Token ...'
--form 'section="section"' \
--form 'weekday="weekday"' \
--form 'start_time="start_time"' \
--form 'end_time="end_time"'```
* Response
  * code 200
  ```bash
  {
    "message": Schedule has been created!",
    "completed": True
  }
  
### Student


### GET /
* General:
  * Return initial detail about the students
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  {
    "user": {
        "id": 6,
        "first_name": "Testing",
        "last_name": "Student",
        "username": "testingStudent@gmail.com",
        "email": "testingStudent@gmail.com"
    },
    "current_course": {
        "canvasId": "",
        "name": "",
        "course_number": "",
        "start_date": null,
        "end_date": null
    },
    "current_section": {
        "name": "",
        "canvasId": "",
        "course": null,
        "instructor": null,
        "students": []
    },
    "registration_completed": {
        "completed": false
    },
    "role_teacher": false,
    "issues": [],
    "report": []
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```
  
### GET /attendance/
* General:
  * Return verification of user's taking attendance for the current section
* Sample: ``` curl --location --request GET 'http://localhost:5000/api/v1/attendance/' \
--header 'Authorization: Token ...'```
* Response
  * code 200
  ```bash 
  {
    "message": "Attendance already recorded",
    "authorization": 0
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```
  
### POST /attendance/
* General:
  * Return submit attendance for the current section
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/attendance/' \
--header 'Authorization: Token ...' \
--form 'emotionImage=@"image.jpg"' \
--form 'regularImage=@"image.jpg"' \
--form 'emotion="happy"'```
* Response
  * code 200
  ```bash 
  {
    "message": "You have been marked present",
    "completed": true
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```
  * code 404 
  ```bash 
  {
    "detail": "Student not found"
  }
  ```
  * code 422 
  ```bash 
  {
    "detail": "Unable to process attendance."
  }
  ```
  
### POST /registration/
* General:
  * Return submit portrait and encode image
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/registration/' \
--header 'Authorization: Token ...' \
--form 'imageFile=@"image.png"'```
* Response
  * code 200
  ```bash 
  {
    "file": "image",
  }
  ```
  * code 401 
  ```bash 
  {
    "detail": "Authentication credentials were not provided."
  }
  ```
  
  * code 422 
  ```bash 
  {
    "detail": "Unable to process registration."
  }
  ```

### POST /issue_submission/
* General:
  * Submit an issue that the instructor can see when they've used up their attendance attempts
* Sample: ``` curl --location --request POST 'http://localhost:5000/api/v1/issue_submission/' \
--header 'Authorization: Token ...' \
--form 'subject="issue_subject"' \
--form 'message="issue_message"'```
* Response
  * code 200
  ```bash
  {
    "message": "Issue has been submitted!",
    "completed": True
  }
  ```
  
  * code 400
  ```bash
  {
    "message": "Cannot submit a blank issue!",
    "completed": False
  }
