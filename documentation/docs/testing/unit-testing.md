---
sidebar_position: 1
---
# Unit tests
For each method, one or more test cases.

A test case consists of input parameter values and expected results.

All external classes should be stubbed using mock objects.

## TestObtainingCanvasToken(canvas_code)
		Test: Send a http post request to canvas passing code to request token access
		Result: return pass if receiving token from canvas, else false

## TestGeneratingAccessToken
		Test: Request token to access AFR API
		Result: Return pass if receiving token from AFR api, else false

## TestEncodeStudentFace(user, upload_image)
		Test: Pass user id and image to be encoded and save to database
		Result: Return pass if image has been encoded, else false

## TestRecognizeImage (upload_image)
		Test: Pass uploaded user’s picture to recognize a user as a student
		Result: Return pass if student has been recognized, else false

## TestGetUserInfo()
		Test: Request user info
		Result: Return pass if response is not empty, else false

## TestGetUserAttendanceReport()
		Test: Request user’s attendance report
		Result: Return pass if response is not empty, else false

## TestReportIssue()
		Test: See if user can click on help button and send notification to report issue
		Result: Return pass if notification has been sent, else false

## TestUploadPicture(picture)
		Test: see if user can upload picture
		Result: return pass if picture has been uploaded, else false

## TestCameraSnapShotButton()
		Test: see if camera is able to take a snapshot after pressing button
		Result: return pass if snapshot has been taken
