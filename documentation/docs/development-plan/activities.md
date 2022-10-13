---
sidebar_position: 1
---

# Activities
## Requirements Gathering
During our requirements gathering, our number one focus was to figure out a way to improve the attendance system on the Canvas Platform. Each team member was given a task to come up with ways to make the attendance system easier and more efficient for online users. The solution we came up with was to make an automated system using a deep learning technique known as face recognition which reduces the professor's manual work. <br/>
Since we do not have admin access to our school canvas platform, our team came with a solution to use the canvas docker image to perform our development. Each of us also realized that we have to gain knowledge on using different libraries of python and opencv to get familiar with face recognition using deep learning on the back end. We also decided to use MySQL to store the images of students, so the application will use it to match and identify who is present during attendence. We also decided to use Django framework and react JS to develop the front end. <br/>
We analyzed the goals for the project and determined that our face recognition system will allow students to access the application from canvas and simply look into the webcam. If their face is recognized, the application will mark the student as present in the record. A new student to the university would have to upload or capture their picture with good lighting once to get into the database and to use the application anytime in the future. If a student does not get recognized, the system will give them multiple tries. If all of them fail, they can report the issue to the professor with a button. On the professor's end, they will be able to see reported issues and have a chance to make changes manually and to view the attendence records.

## Top-Level Design
1.	Integrate the web application into canvas
2.	Create layout with necessary tabs for navigation
3.	Create the backend and database communication 
4.	Create an algorithm that detects users’ face in any different angle
5.	Create an attendance report generator for the professor
6.	Create a system reminder for students to take their attendence while in class
7.	Create a form for students to report any issue they may run into
8.	Create a notification system that notifies issues faced by students to the professor
9.	Create a summary report for students to view their own attendance
10.	Testing

## Detailed Design
1.	Integrate the web application into canvas
*	Develop the web application and be able to integrate it into canvas to have it function the way we intended it to
2.	Create the layout with necessary tabs for navigation
*	Develop and design the web application UI with required tabs to access pages that show different data and functions
*	One tab that allows students to take attendance and other tab to show the attendence report
3.	Create the backend and database communication
*	Python libraries, modules, and deep learning will be used to make the facial recognition feature work.
*	With the Django ORM, we will be interacting with the MySQL database which stores information about students’ attendance and images encoding
4.	Create/find an algorithm that detects users’ face in any different angle
*	This algorithm should be able to detect the users just using their actual face features like eyes, nose, mouth, and facial dimensions rather than their physical appearance to be more accurate
*	This allows the recognition to be more accurate identifying the user from any angle and in any appearance
5.	Create an attendance report generator for the professor
*	Once the professor clicks on the report tab, the system should generate an up-to-date report of the class and display it on the report page. 
*	The system should store all of the attendances recognized by the students into the database and make a report from it
6.	Create a system reminder for students to mark their presence in class
*	One of the settings that professor can choose to set to let students know the attendance availability on every class day
*	This should send a reminder to all the students in the class to mark attendance at a specific time 
7.	Create a form for students to report any issue
*	If students face issues marking their presence, they will have the option to click on a button to report the issue.
*	A form should be displayed to give the students the possibility to explain their issue, which will be sent along with a webcam captured picture to the professor
8.	Create a notification system that notifies issues faced by students to the professor
*	If students face issues marking their presence, they will have the option to click on a button to report the issue.
*	This should send a notification to the professor to help with the issue
9.	Create a summary report for students to view their own attendance
*	Once a student clicks on the report tab, the system should generate an up-to-date report and display it on the report page. 
10.	Testing
*	Testing will be done in different phases of code development. A more detailed explanation of testing is provided below. 

## Tests
There will be 3 different types of testing for the Attendance Face Recognition App. This includes unit testing, integration testing and acceptance tests.
*	Unit:
    *	Unit testing for the application will be performed to the logics in the code function as intended
    *	Our team will utilize jest testing framework to implement unit tests for our react.js application and unit test for our Django application. There will be a test for each method and function in our code to ensure proper functionality.
*	Integration:
    *	Automated API integration tests will be written using Django’s web client to mock requests to the server.
    *	Manual API integration tests will be conducted using Postman to issue HTTP requests to the server. 
    *	Jest testing framework will be used to ensure the flow of our user stories. It will allow us to make mock objects for this testing implementation. 
*	Acceptance:
    *	Our team will create a series of tasks that will encapsulate all the functional and non-functional requirements for the Attendance Face Recognition app. These tasks will be completed by actual users and our team will take notes of every interaction the user takes on the interface. After this, analysis will be done to see if they were able to complete the flow or if there were difficulties due to the interface. From these results, we can go back and ensure any missteps will not happen again. 
