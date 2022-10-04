---
sidebar_position: 1
---

# System Overview

## Project Abstract
This document proposes a novel application of face recognition as a biometric technique to track the attendance of employees within a remote company, as well as students taking a course virtually. By utilizing built-in cameras that many mobile devices and laptops have nowadays, this application will identify and analyze each unique face within the span of the camera and match it with an image from the database. If the application does not identify the person, it will alert the required personnel (eg. boss, professor, etc.) about it. The attendance report of everyone who was present will also be shown to the admin.

## High Level Requirement
This application is fully web-based and facial recognition will be developed using python libraries. There will be a database that contains images of every user within a specific work team or class (set the first time they use the application). The application will work by having a link sent out to users by their specific organization or a higher-up/admin (eg. boss, professor, etc.). When a user opens the link provided, they'll be prompted to turn on and look at their camera in good lighting. The user will be matched against existing data within the dataset. If a user is recognized, their presence will be recorded. Otherwise, it gives them a few attempts to try again. Once the limited number of attempts is met, it alerts the user's admin who checks the attendance manually.

## Conceptual Design
The initial plan for developing this web-based application is by building the front-end using HTML, CSS, JavaScript, React and Django framework. The backend will be developed using the programming lanugage Python and will utilize libraries such as: OpenCV, Dlib, and Face Recognition package. A database (eg. MySQL) will be used to store the data of the users. Any operating system could be used as it is a web-based application. The camera built into a user's laptop or mobile device will be used to scan their face.

## Scope of the Project
We, the team members, are designing this project for both schools and companies to use face recognition for attendance. The project will require front end skills for web application development and back-end skills for face recognition (namely - Python and OpenCV). Some database knowledge will also be required. The project should be finished within 3 months or less. We also are fortunate to have individuals on the team with these required skills. Throughout the semester, we will have a weekly plan to manage the development of the application and ensure that deliverables meet the deadlines. The main limitation to this project is the need for good lighting while a user's face is in front of the camera. If there isn't good lighting, there may be issues within the application recognizing who the user is.
