---
sidebar_position: 2
---
# Integration tests

Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results.

## AFR Access Test:
-	Objective: Test the connection between Canvas and AFR
-	Description: Users click on the attendance link on canvas and take them to the AFR homepage
-	Expected Result: To be directed to the AFR homepage

## API Call Test
-	Objective: A collection of tests will be run to verify all the API endpoints 
-	Expected Result: A pass or fail result will be displayed for each endpoint 

## Database Test
-	Objective: Verification of information that passing between the application and the database
-	Expected Result: Storing data and returning the right information

## Attendance Test
-	Objective: Testing the face recognition system and integration with the database 
-	Expected Result: Recognize and mark user’s attendance

## Reporting Test
-	Objective: Test the integration between the AFR reporting to database
-	Expected Result: Able to view of user’s attendance

