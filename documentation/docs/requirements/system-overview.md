---
sidebar_position: 1
---

# System Overview

##Project Abstract
This document proposes a novel application of a face recognition as a biometric technique to track the attendance of employees and students in companies and schools respectively. When the user uses their camera built in their mobile/laptop, this system identifies each unique face and matches it with the images from the data in the database. If the system does not identify the person, it would alert the required person about it. The attendance report will also be shown to the admin.

##High Level Requirement
This application is a web-based application and when the user opens this using the link provided by their organization, the user looks at the camera in a good lighting and the system which will be developed using the python libraries for face recognition.  The database will have the data of the users and will match both to recognize the user. Once recognized, the attendance will be recorded and if not recognized, if gives them few tries to try again and if the limit is met, it alerts the person who checks the attendance.

##Conceptual Design
The initial plan for developing this application as a web-based developed using HTML, CSS, JavaScript, React and by using Django framework on the front end. The back end would be developed using python as the programming language and use libraries like OpenCV, Dlib and Face Recognition package. A database like MySQL is used to store the data of the users. Any operating system could be used as it is a web-based application. Camera built in the devices will be used to scan the faces of the users.

##Scope of the Project
We, the team members are designing this project for schools and companies to use face recognition for attendance with average cost for the project that requires front end skills for web application development and back-end skills for face recognition with python and OpenCV with the usage of database. This is a doable project in 3 months or less time for which we have enough people with required skills and with a plan to manage the development and deadlines for deliverables for every short period of time for the project. The only limitation is that while trying to recognize oneself for attendance they should be in a good lighting, if not there might be issues for the model for quick action.
