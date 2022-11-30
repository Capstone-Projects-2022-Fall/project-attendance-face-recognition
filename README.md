![Open in Codespaces](https://classroom.github.com/assets/open-in-codespaces-abfff4d4e15f9e1bd8274d9a39a0befe03a0632bb0f153d0ec72ff541cedbe34.svg)
<div align="center">

# Attendance Face Recognition
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/AFR/boards/20)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://capstone-projects-2022-fall.github.io/project-attendance-face-recognition/docs/intro)


</div>


## Keywords

Section 004, Python, Web-based, Django, HTML5, CSS3, JavaScript, MySQL, Face Recognition, Machine Learning, Dlib.

## Project Abstract

This document proposes a novel application of face recognition as a biometric technique to track the attendance of employees within a remote company, as well as students taking a course virtually. By utilizing built-in cameras that many mobile devices and laptops have nowadays, this application will identify and analyze each unique face within the span of the camera and match it with an image from the database. If the application does not identify the individual, it will let the admin user (eg. boss, professor, etc.) know about it. The attendance report of everyone who was present will also be shown to the admin.

## High Level Requirement

This application is fully web-based and facial recognition will be developed using python libraries. There will be a database that contains images of every user within a specific work team or class (set the first time they use the application). The application will work by installing it to their specific organization applications or by itself. When a user opens the application, they'll be prompted to turn on and look at their camera in good lighting. The user will be matched against existing data within the dataset. If a user is recognized, their presence will be recorded. Otherwise, it gives them a few attempts to try again. Once the limited number of attempts is met, the user could report the issue to the admin.

## Conceptual Design

The initial plan for developing this web-based application is by building the front-end using HTML, CSS, JavaScript, React and Django framework. The backend will be developed using the programming lanugage Python and will utilize libraries such as: OpenCV, Dlib, and Face Recognition package. A database (eg. MySQL) will be used to store the data of the users. Any operating system could be used as it is a web-based application. The camera built into a user's laptop or mobile device will be used to scan their face.

## Background
The goal of this project is to build a monitoring system to track the attendance of its users. This will be a web-based application that has the potential to integrate with other school applications (eg. Canvas) to record attendance. This tool will make taking attendance more accurate and efficient, and will not allow the ability for users to cheat the system. As online classes and jobs become more common, the need for a web-based attendance tracker becomes more evident. Thus, we decided to create our project - AFR.
There are many other similar products, such as https://ubsapp.com/face-recognition-attendance-management/ and https://enalytix.com/face-recognition-attendance-system, that exist in the market. However, we hope to differentiate ourselves by adding an alerting and reporting system. By doing this, the 'higher up' admin user (eg. boss, professor, etc.) can view attendance reports without need for much human work. There are also other ways to take attendance that exist already, such as manually recording and using numeric code-based attendance, however these come with more human-work and can potentially be 'cheated'. We hope to reduce the time it takes for attendance to be tracked and stored, while also allowing it to be fair for everyone.
Citations:
- Face recognition attendance management system: UBS. The Ultimate Business System. (2022, September 19). Retrieved November 15, 2022, from https://ubsapp.com/face-recognition-attendance-management/
- Face recognition attendance system: Employee productivity. Enalytix. (n.d.). Retrieved November 15, 2022, from https://enalytix.com/face-recognition-attendance-system 


## Required Resources

To develop this, our team should have knowledge in python and/or web development. The other knowledge that we must gather are:
- Designing a web-based platform and choosing the right tool for it
- Knowledge of using python libraries
- An alerting system (for example - send emails)
- Database (MySQL) usage and association with application
- Django
- Usage of Dlib, OpenCV, & Face recognition package
- More information on access for usage of AWS platforms
- Research about Material UI for the web development

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/ApplebaumIan">
            <img src="https://avatars.githubusercontent.com/u/9451941?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Ian Tyler Applebaum</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/tun77242">
            <br />
            <sub><b>Hamsa Shaik</b></sub>
        </a>
     </td>
     <td align="center">
        <a href="https://github.com/jerry-maurice">
            <br />
            <sub><b>Jerry Maurice</b></sub>
        </a>
      </td>
     <td align="center">
        <a href="https://github.com/shiv823">
            <br />
            <sub><b>Shiv Patel</b></sub>
        </a>
      </td>
     <td align="center">
        <a href="https://github.com/anjezabeca">
            <br />
            <sub><b>Anjeza Beca</b></sub>
        </a>
    </td></tr>
</table>

[//]: # ( readme: collaborators -end )
