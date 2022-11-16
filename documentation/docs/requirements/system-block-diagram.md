---
sidebar_position: 2
---

# System Block Diagram


![image](https://user-images.githubusercontent.com/78066498/202242391-510fb363-9dba-45f7-a624-985cd316e85a.png)

If a student user is new to the AFR application, once they login through Canvas, the application will ask them to scan or upload multiple portrait photos of themselves which will be encoded and save to the application database. These photos will then be store in an AWS bucket. 
OpenCV will detect, transform, and crop these images which will be encoded by dlib.
The embedded images will be written on a file along with each student's ID. These will be stored in an Amazon S3 bucket.
During the attendance, the application will ask the user to scan their face using their webcam in order to be marked as present. Once a student user's face has been scanned, it will send the captured picture to the backend. Here it will be transformed and cropped by OpenCV. Then, dlib will encode the image. The encoded image will be compared with other encoded photos to find a match using the Face_recognition package. If a match is able to be found, the student will be marked as present. Once the class is finished, the attendance report showcasing records of the students' attendances will be sent to the professor. The data for this will be associated with and from canvas. The front end will be developed using HTML, CSS, React, JavaScript, and Django. We initially plan on hosting it on AWS services, but might explore other options and choose the better one.
