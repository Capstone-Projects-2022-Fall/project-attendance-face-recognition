---
sidebar_position: 1
---
# Unit tests
For each method, one or more test cases.

A test case consists of input parameter values and expected results.

All external classes should be stubbed using mock objects.

# Account View

The tests for this view create a section of a course, and assign four created students and a created instructor to that class.  The section has an attendance schedule that indicates that class starts when the test is created and ends an hour later. The section has four attendances - one for each student. Two students are present, one student is late, and one student is absent. Ten issues are present.

To run these tests, navigate to the faceRecognitionAPI directory and run the following command:

```python3 manage.py test account```

## test_initial_student_view()
		Test: Send a get request to '/' as a student to receive their information
		Result: Return pass if the information is passed back correctly, else fail
		
## test_initial_instructor_view()
		Test: Send a get request to '/' as an instructor to receive their initial information
		Result: Return pass if the information is passed back correctly, else fail
		
# Recognition View

The tests for this view create a section of a course, and assign a created student and instructor to that class. The section has an attendance schedule that indicates that class starts when the test is created and ends an hour later. Four images have been uploaded for the student - these are actual images that are stored in the AFR repo instead of being dummy images passed in.

To run these tests, navigate to the faceRecognitionAPI directory and run the following command:

```python3 manage.py test recognition```

## test_that_student_image_is_encoded()
		Test: Verify that there are four images stored in the backend for the student, and that they each have an associated encoding.
		Result: Return pass if the images and encodings exist, else fail

## test_that_correct_student_is_recognized()
		Test: Verify that the student is recognized when they upload another image of themselves
		Result: Return pass if the new image is recognized as the student, else fail

## test_that_student_not_in_class_is_not_recognized()
		Test: Verify that the student is not recognized when they upload an image that is not of any student in the class
		Result: Return pass if the new image is not recognized as the student, else fail
		
## test_that_mismatched_student_is_not_recognized()
		Test: Verify that the student is not recognized when they upload an image that is of a different student in the class
		Result: Return pass if the new image is not recognized as the student, else fail

## test_ability_to_get_student_images_if_empty_set()
		Test: Verify that no images are returned when a GET method to /registration is called as a student that does not have images uploaded
		Result: Return pass if no student images are returned, else fail
		
# Attendance view

The tests for this view create a section of a course, and assign four created students and a created instructor to that class. The section has an attendance schedule that indicates that class starts when the test is created and ends an hour later; students will be marked late if they take attendance more than 5 minutes after class starts. Four actual images have been uploaded for one student, while five dummy images have been uploaded for another student. The section has four attendances - one for each student. Two students are present, one student is late, and one student is absent. 12 issues are present.

To run these tests, navigate to the faceRecognitionAPI directory and run the following command:

```python3 manage.py test attendance```

## test_that_student_cannot_access_teacher_daily_report()
		Test: Verify that students cannot access the teacher's daily report page, /report/today
		Result: Return pass if the student receives a 403 response, else fail
		
## test_that_student_cannot_access_attendance_statistics()
		Test: Verify that students cannot access the teacher's attendance statistics page, /statistics/attendance
		Result: Return pass if the student receives a 403 response, else fail
		
## test_teacher_attendance_statistics()
		Test: Verify that the teacher receives the correct attendance statistics when they call the GET method of /statistics/attendance
		Result: Return pass if the teacher receives the correct attendance statistics, else fail
		
## test_that_student_cannot_access_section_statistics()
		Test: Verify that students cannot access the teacher's section statistics page, /statistics/sections
		Result: Return pass if the student receives a 403 response, else fail
		
## test_teacher_section_statistics()
		Test: Verify that the teacher receives the correct section statistics when they call the GET method of /statistics/sections
		Result: Return pass if the section and students returned in the response are correct, else fail
		
## test_that_student_cannot_access_attendance_monitoring()
		Test: Verify that students cannot access the teacher's attendance monitoring page, /attendance/monitoring
		Result: Return pass if the student receives a 403 response, else fail
		
## test_teacher_attendance_monitoring()
		Test: Verify that the instructor receives the correct attendance data when they call the GET method of /attendance/monitoring
		Result: Return pass if the attendances returned in the response are correct, else fail
		
## test_teacher_attendance_monitoring_with_no_class()
		Test: Verify that the instructor does not receive any attendances when they call the GET method of /attendance/monitoring when no class is currently being held
		Result: Return pass if no attendances were returned, else fail
		
## test_that_student_cannot_take_attendance_with_no_pictures()
		Test: Verify that the student is not authorized to take attendance if they do not have any images uploaded
		Result: Return pass if the authorization in the response is set to 0 and the response's message indicates that no images were uploaded, else fail
		
## test_that_student_cannot_take_attendance_twice()
		Test: Verify that the student is not authorized to take attendance if they have already taken it for this class
		Result: Return pass if the authorization in the response is set to 0 and the response's message indicates that attendance was already taken, else fail
		
## test_that_student_can_take_attendance_with_four_pictures()
		Test: Verify that the student is authorized to take attendance if they have four pictures uploaded and have not taken attendance yet
		Result: Return pass if the authorization in the response is set to 1 and the response's message indicates that they can take attendance (but should upload more pictures), else fail
		
## test_that_student_can_take_attendance_with_five_pictures()
		Test: Verify that the student is authorized to take attendance if they have five pictures uploaded and have not taken attendance yet
		Result: Return pass if the authorization in the response is set to 1 and the response's message indicates that they are ready to take attendance, else fail
		
## test_that_instructors_cannot_take_attendance()
		Test: Verify that teachers are not allowed to take attendance
		Result: Return pass if the response has status code 404, else fail
		
## test_that_student_cannot_submit_blank_issue()
		Test: Verify that students cannot submit issues with blank message or subject fields
		Result: Return pass if the response indicates that a blank issue could not be submitted, else fail
		
## test_that_instructor_cannot_submit_issues()
		Test: Verify that teachers cannot submit issues
		Result: Return pass if the response has status code 404, else fail
		
## test_that_student_can_submit_issues()
		Test: Verify that students can submit issues when they perform a POST to /issue_submission/ with valid information
		Result: Return pass if an associated Issue object is created in the backend, else fail
		
## test_that_instructor_can_approve_issues()
		Test: Verify that teachers can approve single issues, as well as groups of issues
		Result: Return pass if the associated issues are deleted from the backend after they are approved, else fail
		
## test_that_students_cannot_approve_issues()
		Test: Verify that students are not allowed to approve issues
		Result: Return pass if the response from /issue_submission/ has status code 404 when reached by a student, else fail
		
## test_that_instructor_can_reject_issues()
		Test: Verify that teachers can reject single issues, as well as groups of issues
		Result: Return pass if the associated issues are deleted from the backend after they are approved, else fail
		
## test_that_student_cannot_reject_issues()
		Test: Verify that students are not allowed to reject issues
		Result: Return pass if the response from /issue_rejection/ has status code 404 when reached by a student, else fail
		
# Course view

The tests for this view create a section of a course, and assign a created student and instructor to that class. 

To run these tests, navigate to the faceRecognitionAPI directory and run the following command:

```python3 manage.py test course```

## test_that_teacher_can_view_courses()
		Test: Verify that the teacher can view their current courses upon a GET to /courses/
		Result: Return pass if the course is returned, else fail
		
## test_that_student_cannot_view_courses()
		Test: Verify that the student cannot perform a GET to /courses/
		Result: Return pass if the response from /courses/ has status code 403 when reached by a student, else fail
		
## test_that_teacher_cannot_add_invalid_course()
		Test: Verify that the teacher cannot add a course upon a POST to /courses with invalid course data
		Result: Return pass if the response from /courses/ has status code 400, else fail
		
## test_that_teacher_cannot_add_the_same_course_twice()
		Test: Verify that the teacher cannot add a course that already exists in the backend
		Result: Return pass if no new courses are added to the backend, else fail
		
## test_that_student_cannot_add_courses()
		Test: Verify that the student cannot perform a POST to /courses/
		Result: Return pass if the response from /courses/ has status code 403 when reached by a student, else fail

## test_that_student_cannot_view_active_canvas_courses()
		Test: Verify that the student cannot perform a GET to /canvas/courses/
		Result: Return pass if the response from /canvas/courses/ has status code 403 when reached by a student, else fail
		
## test_that_student_cannot_get_or_modify_sections()
		Test: Verify that the student cannot perform a GET or POST to /canvas/<course id>/sections/
		Result: Return pass if the response associated with the GET and POST has status code 403, else fail
		
## test_that_teacher_cannot_add_duplicate_schedule()
		Test: Verify that the teacher cannot add a schedule to a section that contains the same weekday and start time as another schedule for that section
		Result: Return pass if the schedule is not added to the backend and the response contains status code 422, else fail
		
## test_that_teacher_cannot_add_mistimed_schedule()
		Test: Verify that the teacher cannot add a schedule to a section that contains an end time before the start time
		Result: Return pass if the schedule is not added to the backend and the response contains status code 422, else fail
		
## test_that_student_cannot_add_schedule()
		Test: Verify that the student cannot perform a POST to /section/schedule/ to add a schedule
		Result: Return pass if the response from /section/schedule/ has status code 403 when reached by a student, else fail
		
## test_that_teacher_can_delete_schedule()
		Test: Verify that the teacher can delete a schedule by calling the DELETE method of /schedule/<schedule id>
		Result: Return pass if the schedule is deleted from the backend and the response contains status code 204, else fail
		
## test_that_student_cannot_delete_schedule()
		Test: Verify that the student cannot perform a DELETE to /schedule/<schedule id> to delete a schedule
		Result: Return pass if the response from /schedule/<schedule id> has status code 403 when reached by a student, else fail
		
## test_that_teacher_can_delete_section()
		Test: Verify that the teacher can delete a section by calling the DELETE method of /sections/<section id>
		Result: Return pass if the section is deleted from the backend and the response contains status code 204, else fail
		
## test_that_student_cannot_delete_section()
		Test: Verify that the student cannot perform a DELETE to /sections/<section id> to delete a section
		Result: Return pass if the response from /sections/<section id> has status code 403 when reached by a student, else fail
