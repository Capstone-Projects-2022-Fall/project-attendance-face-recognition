![Open in Codespaces](https://classroom.github.com/assets/open-in-codespaces-abfff4d4e15f9e1bd8274d9a39a0befe03a0632bb0f153d0ec72ff541cedbe34.svg)
<div align="center">

# Attendance Face Recognition
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/AFR/boards/20)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>


## Keywords

Section 004, Python, Web-based, Django, HTML, CSS, JavaScript, MySQL, Face Recognition, Dlib.

## Project Abstract

This document proposes a novel application of a face recognition as a biometric technique to track the attendance of employees and students in companies and schools respectively. When the user uses their camera built in their mobile/laptop, this system identifies each unique face and matches it with the images from the data in the database. If the system does not identify the person, it would alert the required person about it. The attendance report will also be shown to the admin.

## High Level Requirement

This application is a web-based application and when the user opens this using the link provided by their organization, the user looks at the camera in a good lighting and the system which will be developed using the python libraries for face recognition.  The database will have the data of the users and will match both to recognize the user. Once recognized, the attendance will be recorded and if not recognized, if gives them few tries to try again and if the limit is met, it alerts the person who checks the attendance.

## Conceptual Design

The initial plan for developing this application as a web-based developed using HTML, CSS, JavaScript, React and by using Django framework on the front end. The back end would be developed using python as the programming language and use libraries like OpenCV, Dlib and Face Recognition package. A database like MySQL is used to store the data of the users. Any operating system could be used as it is a web-based application. Camera built in the devices will be used to scan the faces of the users.

## Background
The goal of this project is to build a monitoring system to track the attendance of the users and integrate with the other school application to record it. This system makes the attendance more accurate and efficient, which does not give chances for cheating or flaws. There are many other similar products like https://ubsapp.com/face-recognition-attendance-management/, https://enalytix.com/face-recognition-attendance-system are already in the market, developed but We wanted to add alerting and reporting system for this, so the higher authorities can see the reports without too much of human work. Being able to alert via email if anything to suspect is going on will be a different feature and the idea of integrating that report into other educational/organizational tracking applications would be beneficial for the use. We think the difference from the systems used in schools like code attendance or manually checking in are available, but the face recognition system would be even more accurate and reduce time and human work for the school systems for tracking attendance.

## Required Resources

To develop this, we should have at least minimum knowledge in python or web development. The other knowledge that we must gather are - 
•	Designing web-based platform and choosing right tool for us for it
•	Knowledge of using python libraries
•	Alerting system (may be to send emails)
•	Database (MySQL) usage and association with application
•	Django
•	Usage of Dlib, OpenCV, Face recognition package
•	More information on access for usage of AWS platforms
•	Research about Material UI for the web development

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
            <img src="https://avatars.githubusercontent.com/u/77810293?v=4" width="100;" alt="tun77242"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td></tr>
</table>

[//]: # ( readme: collaborators -end )
