---
sidebar_position: 1
---

# Activities
## Requirements Gathering
During our requirements gathering, our number one focus was to figure out a way to improve the attendance system on the Canvas Platform. Each team member was given a task to come up with ways to make the attendance system easier and more efficient for online users. The solution we came up with was to make an automated system using a deep learning technique known as face recognition in order to reduce the professor's manual work.

Since we do not have admin access to our school's Canvas platform, our team came with a solution to use the canvas docker image to perform our development. Each of us also realized that we have to gain knowledge on using different libraries of python and opencv to get familiar with face recognition using deep learning on the back end. We also decided to use MySQL to store the images of students, so the application can use it to match and identify who is present during attendence. We also decided to use Django framework and react JS to develop the front end. For web based hosting, we plan to use Amazon Web Services Lightsail.

We analyzed the goals for the project and determined that our face recognition system will allow students to access the application directly from Canvas and simply look into the webcam. If their face is recognized, the application will mark the student as present in both the student and professor records, as well as in Canvas by autograding. A new student to the university would have to upload or capture 5 photos of themself with good lighting just one time in order to get them into the database. These photos will then be used by the application to be matched against when analyzing a student's face when they take attendance. If a student does not get recognized, the system will give them 5 tries. If all of them fail, a report issue button will pop up and they can then report their issue to the professor. On the professor's end, they will be able to see all of the reported issues and decide whether or not to reject or approve them. If approved, the student's grade automatically gets adjusted in both the application and Canvas. The professor can additionally view attendance records of their students.

## Top-Level Design
This web application will serve as a new, innovative method to take attendance. It will be connected with Canvas and allow students to take attendance using face recognition. The student's face will be analyzed to identify if they are present during class. If they are, they will be marked as present. The professor will be able to use the application as well in order to keep track of their students' attendances.

Our steps to build this application are as follows:

1.	Integrate the web application into Canvas
2.	Create a layout with the necessary tabs for navigation
3.	Create the backend and database communication 
4.	Create an algorithm that detects users’ face in any different angle
5.	Create a scheduler to allow a professor to set the time and days of the week
6.	Create an attendance report generator for the professor
7.	Create a form for students to report any issue they may run into
8.	Create a method for professors to approve or reject student issues
9.	Create a summary report for students to view their own attendance
10. Integrate the application with Canvas assignments to allow for autograde
11. Testing

## Detailed Design
1.	Integrate the web application into Canvas
*  Develop the web application and be able to integrate it into Canvas to set up the base for the project
2. Create a layout with the necessary tabs for navigation
*  Develop and design the web application UI with required tabs needed to access pages that show different data and functions
*  The two main tabs will include one to allow students to take attendance and the other to show the attendance report
3. Create the backend and database communication
*  Python libraries, modules, and deep learning will be used to make the facial recognition feature work
*	With the Django ORM, we will be interacting with the MySQL database which stores information about students’ attendance and images encoding
4. Create an algorithm that detects users’ face in any different angle
*  This algorithm will be able to detect a user just using their individual face features like eyes, nose, mouth, and facial dimensions to be more accurate
5. Create a scheduler to allow a professor to set the time and days of the week
*  The scheduler will allow for the professor to set a specific time and days of the week they want class to occur
*  When the time and day of the week matches, the take attendance page will be accessible to students
6. Create an attendance report generator for the professor
*	Once a professor clicks on the report tab, the system should generate an up-to-date report of the class attendance and display it on the report page.
*  The system should store all of the student attendances recognized by the application into the database and make a report from it
7. Create a form for students to report any issue they may run into
*	If a student faces an issue marking their presence, they will have the option to click on a button to report the issue
*	A form will be displayed to give the student the possibility to explain their issue, which will then be made viewable to the professor
8. Create a method for professors to approve or reject student issues
*  When the professor sees the list of the student issues, they will be able to approve or reject the issue.
*  The approved issue will be marked as present ultimately, whereas the reject will simply remove it
9. Create a summary report for students to view their own attendance
*  Once a student clicks on the report tab, the system will generate an up-to-date report of their attendance and display it on the report page
10. Integrate the application with Canvas assignments to allow for autograde
*  The professor will be able to create an attendance assignment automatically by launching the web application
*  When the student takes their attendance, they will be marked in Canvas as present
*  When the student is late or absent, their grade will be adjusted to represent this
11. Testing
*	Testing will be done in different phases of code development and will include unit testing, integration testing, and acceptance testing.
*	A more detailed explanation of testing is provided below.

## Tests
There will be 3 different types of testing for the Attendance Face Recognition App. This includes unit testing, integration testing and acceptance testing.
*	Unit Testing:
    *	Unit testing for the application will be performed to the logics in the code function as intended
    *	Our team will utilize jest testing framework to implement unit tests for our react.js application and unit test for our Django application. There will be a test for each method and function in our code to ensure proper functionality.
*	Integration Testing:
    *	Automated API integration tests will be written using Django’s web client to mock requests to the server.
    *	Manual API integration tests will be conducted using Postman to issue HTTP requests to the server. 
    *	Jest testing framework will be used to ensure the flow of our user stories. It will allow us to make mock objects for this testing implementation.
*	Acceptance Testing:
    *	Our team will create a series of tasks that will encapsulate all the functional and non-functional requirements for the Attendance Face Recognition app. These tasks will be completed by actual users and our team will take notes of every interaction the user takes on the interface. After this, analysis will be done to see if they were able to complete the flow or if there were any difficulties due to the interface. From these results, we can go back and ensure any missteps will not happen again.
