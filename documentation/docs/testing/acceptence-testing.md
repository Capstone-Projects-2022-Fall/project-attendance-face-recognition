---
sidebar_position: 3
---
# Acceptance Test

Demonstration of all of the functional and non-functional requirements. This can be a combination of automated tests derived from the use-cases (user stories) and manual tests with recorded observation of the results.

## Accessing AFR
Log into Canvas and select the desired course. Click on "Attendance Face Recognition" on the navigation pane on the left side.<br /> 
*Expected result:*<br />
The user should be redirected to the AFR application from Canvas.
	
## Student Registration
When a student launches AFR and clicks the "Registration" tab, AFR allows them to upload images of themselves that they can use for recognition.<br />
*Expected result:*<br />
Student is prompted to upload images of themselves upon clicking the "Registration" tab.

## Ability to Take Attendance
When a student launches AFR and there is a class taking place, the student will be able to click the "Record Attendance" button to begin their attendance submission.<br />
*Expected result:*<br />
Student is able to navigate to the attendance page and submit their attendance if a class is taking place

## Attendance Submission
When AFR takes a picture of a registered student, and the emotion conveyed in that picture matches the emotion requested by AFR, then the student is marked present.<br />
*Expected result:*<br />
Student is marked present for their class if they are registered and make the correct emotion on the attendance page.

## Issue Reporting
If the student is unable to take attendance after five attempts, they will be prompted to submit an issue that the professor can see.<br />
*Expected result:*<br />
Student is able to submit an issue if they have used up their five attendance attempts.

## Student Attendance Report
In AFR, the student can click on "Report" to view a summary of their attendances for that class.<br />
*Expected result:*<br />
Student should be able to see a detailed report of their attendance.

## Professor Attendance Report
In AFR, the professor can click on "Report" to view a summary of all attendances taken for their class.<br />
*Expected result:*<br />
Professor should be able to see a detailed report of class attendance.

## Professor Issue Handling
In AFR, the professor should be able to see a list of issues submitted by their students. They should be able to select issues and click on "Approve Selected Issues" or "Reject Selected Issues" to handle them.<br />
*Expected result:*<br />
Professor should be able to see issues submitted by students. They should be able to approve or reject them.

## Canvas Auto-Grading
Once the student takes attendance, their associated Attendance score on Canvas is automatically updated based on whether the student was present, absent, or late.<br />
*Expected result:*<br />
The Canvas attendance grade for a student should automatically update once the student takes attendance.

# Acceptance Test Form

![image](https://user-images.githubusercontent.com/34950870/205520707-90369d96-b1cc-40fa-b1a8-6eb01ef2802e.png)
