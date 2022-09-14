---
sidebar_position: 2
---

# System Block Diagram

![image](https://user-images.githubusercontent.com/78066498/189983672-9e493a65-df59-4120-ac18-c6534f274c78.png)

If student is new, once they create their username and password, the application will ask them to scan or upload multiple portrait pictures which will be sent to the backend.  
OpenCV will detect, transform and crop these images which will be encoded by dlib.
The embedded images will be written on a file along with each student ID which will be store in a S3 bucket.
During attendance, the application asks the user to scan their face in order to be marked present. Once face has been scanned, it will send the captured picture to the backend which be transformed and cropped by OpenCV. Then, dlib will encode the image. The encoded image will be compared with the other encoded picture to find a match using Face_recognition package. If a match is found, the student will be marked present. Once the class is done, the attendance report will be sent to the professor. The data will be associated with and from canvas. The front end will be developed using html, CSS, React, JS, and Django. We initially plan on hosting it on AWS services but might explore other options and choose the better one.
