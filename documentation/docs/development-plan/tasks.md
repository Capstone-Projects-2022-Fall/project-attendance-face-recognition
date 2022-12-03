---
sidebar_position: 2
---

# Tasks

1.	Integrate the web application into Canvas
    *	Create a sample course on Canvas (~1)
    *	Pull and initialize the Canvas docker image (~2)
    *	Seek permission or find a way to add our application to the created Canvas course (~3)
2.	Create a layout with the necessary tabs for navigation
    *	Create a welcome home page (~2)
    *	Create a button and page for the student to take attendance (~2)
    *	Create a button and page for report (~2)
    *	Add exit button (~1)
3.	Create the backend and database communication 
    *	Create a MySQL database schema (~1)
    *	Create an Amazon LightSail private instance (~1)
    *	Create and initialize an Amazon LightSail database (~1)
    *	Install the required libraries and tools to work on the back end (~2)
    *	Write code for face recognition, encoding, and database inclusion (~5)
    *	Establish a connection between the face recognition and database to function accurately (~3)
4.	Create an algorithm that detects users’ face in any different angle
    *	Research for any algorithms that accurately recognizes faces using features in the face (~2)
    *	Implement a method to encode all images in the dataset (~2)
    *	Create it in a way that it compares both faces using features (~2)
5. Create a scheduler to allow a professor to set the time and days of the week
    * Create a button for the professor to create a schedule (~1)
    * Create a form for the professor to select start time, end time, and day of the week for the course section (~2)
    * Allow a method to have the professor select multiple days of the week (~1)
6.	Create an attendance report generator for the professor
    *	Display a table from the data with a list of student attendances for the class (~2)
    *	Create an input field to search for any specific student (~1)
    *	Write a search algorithm to display search results (~2)
7.	Create a form for students to report any issues
    *	Create a form that shows up when clicked on report issue button (~2)
    *	Create text space to write down the issue (~1)
    *	Create submit button (~1)
8. Create a method for professors to approve or reject student issues
    *	Make the submitted issue show up on the professor's application home page (~1)
    *	Create buttons to accept or reject the issue (~1)
    *	Create an option to manually adjust the attendance of that student (~1)
9. Create a summary report for students to view their own attendance
    *	Make the report tab in the home page on students’ view clickable (~1)
    *	Collect the data stored (~1)
    *	Display the up-to-date attendance report of each student (~2)
10. Integrate the application with Canvas assignments to allow for autograde
    * Automatically generate an attendance assignment for the professor's section if needed (~2)
    * Connect Canvas with the web application to give full marks to students who are present (~2)
    * Provide partial or no credit if the student is late or absent (~1)
11. Testing
    *	Perform automated API testing, Postmates and Jest framework for Integration testing (~3)
    *	Create unit tests using Django and Jest for all the logical checks (~3)
    *	Perform acceptance testing to check the flow of use cases (~2)
