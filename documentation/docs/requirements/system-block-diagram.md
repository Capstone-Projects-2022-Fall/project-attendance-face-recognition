---
sidebar_position: 2
---

# System Block Diagram


![Screen Shot 2022-09-13 at 11 45 11 PM](https://user-images.githubusercontent.com/17518043/190054877-41b3d6b5-e57f-4911-845b-2bf7e0467463.png)

If a student user is new to the AFR application, once they login through Canvas, the application will ask them to scan or upload multiple portrait photos of themselves. These photos will then be sent to the backend. 
OpenCV will detect, transform, and crop these images which will be encoded by dlib.
The embedded images will be written on a file along with each student's ID. These will be stored in an Amazon S3 bucket.
During attendance, the application will ask the user to scan their face using their webcam in order to be marked as present. Once a student user's face has been scanned, it will send the captured picture to the backend. Here it will be transformed and cropped by OpenCV. Then, dlib will encode the image. The encoded image will be compared with other encoded photos to find a match using the Face_recognition package. If a match is able to be found, the student will be marked as present. Once the class is finished, the attendance report showcasing records of the students' attendances will be sent to the professor. The data for this will be associated with and from canvas. The front end will be developed using HTML, CSS, React, JavaScript, and Django. We initially plan on hosting it on AWS services, but might explore other options and choose the better one.
