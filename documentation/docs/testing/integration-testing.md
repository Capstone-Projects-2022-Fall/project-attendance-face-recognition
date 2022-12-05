---
sidebar_position: 2
---
# Integration tests

Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results.

These tests are ran in the same test suites that run the unit tests. The ```test_that_teacher_can_add_courses()``` and ```test_that_teacher_can_add_valid_schedule()``` tests are in the Course test suite, the ```test_ability_to_get_student_images()``` test is in the Recognition test suite, and the ```test_if_student_is_marked_present()```, ```test_student_submitting_the_wrong_emotion()```, ```test_if_student_is_marked_late()```, and ```test_teacher_daily_report()``` tests are in the Attendance test suite. Refer to the unit test document for a description on how these test suites are ran.

## API Call Test
-	Objective: A collection of tests will be run to verify all the API endpoints 
-	Expected Result: A pass or fail result will be displayed for each endpoint 

The unit test suite contains the majority of the API call tests - refer to that document for a more detailed description. 

## Database Test
-	Objective: Verification of information that passing between the application and the database
-	Expected Result: Storing data and returning the right information

The following integration tests were developed to test database interaction:
- **test_that_teacher_can_add_courses()**: This test verifies that the teacher can create a course in the frontend and have it added to the backend database. It creates a teacher and valid course information, and executes the POST method that would be called when the teacher wants to add a course to AFR. It then verifies that the Course object has been added to the backend once the POST method completes.

- **test_that_teacher_can_add_valid_schedule()**: This test verifies that the teacher can create a schedule in the frontend and have it added to the backend database. It creates a teacher, course, and valid schedule information, and execues the POST method that would be called when the teacher wants to add a schedule to the course in AFR. It then verifies that the Schedule object has been added to the backend (and is associated with the correct course) once the POST method completes.

- **test_ability_to_get_student_images()**: This test creates a student and uploads registration images of them to the backend. It then verifies that the images are returned in the response when the GET method to /registration is called.

## Attendance Test
-	Objective: Testing the face recognition system and integration with the database 
-	Expected Result: Recognize and mark user’s attendance

The following integration tests were developed to test attendance:
- **test_student_is_marked_present()**: This test verifies that AFR is capable of marking students present. It creates a student that has four images uploaded of themselves uploaded in the backend and prompts them to take attendance. The student "takes attendance" by submitting an image of themselves where they are making the requested emotion. It is verified that AFR recognizes the student in that image, calculates that the emotion they are making matches the requested emotion, and marks the student as present. To verify that AFR marks the student as present, both the message sent to the frontend and Attendance object in the backend are verified.

- **test_student_submitting_the_wrong_emotion()**: This test verifies that AFR does not mark the student present when they submit the wrong emotion. It creates a student that has four images of themselves uploaded in the backend and prompts them to take attendance. The student "takes attendance" by submitting an image of themselves where they are not making the requested emotion. It is verified that AFR recognizes the student, but does not mark them present. To verify that AFR does not mark the student as present, the message sent to the frontend is checked, and it is verified that no Attendance object in the backend is created for that student.  

- **test_student_is_marked_late()**: This test verifies that AFR is capable of marking students late. It creates a student that has four images uploaded of themselves uploaded in the backend and prompts them to take attendance. Unlike in ```test_student_is_marked_present```, the schedule is modified so that it appears that the student is 10 minutes late to class. When the student "takes attendance", it is verified that AFR marks the student as late. To verify that AFR marks the student as late, both the message sent to the frontend and Attendance object in the backend are verified.

## Reporting Test
-	Objective: Test the integration between the AFR reporting to database
-	Expected Result: Able to view of user’s attendance

The following integration tests were developed to test reporting:
- **test_teacher_daily_report()**: This test verifies that AFR passes the teacher's daily report up to the frontend. It creates a list of students and attendances in the backend and mocks the frontend API call that would receive the report. It then verifies that the response that would be sent to the frontend contains the list that was created in the backend.
