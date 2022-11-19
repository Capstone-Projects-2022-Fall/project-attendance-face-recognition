"use strict";(self.webpackChunktu_cis_4398_docs_template=self.webpackChunktu_cis_4398_docs_template||[]).push([[7492],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,k=d["".concat(p,".").concat(m)]||d[m]||u[m]||l;return n?a.createElement(k,i(i({ref:t},c),{},{components:n})):a.createElement(k,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},93782:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return u}});var a=n(83117),r=n(80102),l=(n(67294),n(3905)),i=["components"],o={},p="Attendance Face Recognition",s={unversionedId:"api-specification/AFR_API",id:"api-specification/AFR_API",title:"Attendance Face Recognition",description:"Description",source:"@site/docs/api-specification/AFR_API.md",sourceDirName:"api-specification",slug:"/api-specification/AFR_API",permalink:"/project-attendance-face-recognition/docs/api-specification/AFR_API",draft:!1,editUrl:"https://github.com/Capstone-Projects-2022-Fall/project-attendance-face-recognition/edit/main/documentation/docs/api-specification/AFR_API.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"API Specification",permalink:"/project-attendance-face-recognition/docs/category/api-specification"},next:{title:"Test Procedures",permalink:"/project-attendance-face-recognition/docs/category/test-procedures"}},c={},u=[{value:"Description",id:"description",level:2},{value:"API Reference",id:"api-reference",level:2},{value:"Error Handling",id:"error-handling",level:2},{value:"Endpoints",id:"endpoints",level:2},{value:"Token",id:"token",level:3},{value:"POST /token/",id:"post-token",level:3},{value:"Professor",id:"professor",level:3},{value:"GET /",id:"get-",level:4},{value:"GET /report/today/",id:"get-reporttoday",level:3},{value:"GET /statistics/attendance/",id:"get-statisticsattendance",level:3},{value:"GET /statistics/sections/",id:"get-statisticssections",level:3},{value:"GET /attendance/monitoring/",id:"get-attendancemonitoring",level:3},{value:"GET /courses/",id:"get-courses",level:3},{value:"Student",id:"student",level:3},{value:"GET /",id:"get--1",level:3},{value:"GET /attendance/",id:"get-attendance",level:3},{value:"POST /attendance/",id:"post-attendance",level:3},{value:"POST /registration/",id:"post-registration",level:3}],d={toc:u};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,l.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"attendance-face-recognition"},"Attendance Face Recognition"),(0,l.kt)("h2",{id:"description"},"Description"),(0,l.kt)("p",null,"Attendance Face Recognition is a web application for face recognition as a biometric technique to track the attendance of students taking college courses as well as employees within a remote company. By utilizing built-in cameras that many laptops and mobile devices have nowadays, this application will identify and analyze each unique face within the span of the camera and match it with an image from the database. If the application does not identify the person, it will let the user (e.g., student, employee etc.) know about it and give multiple tries. If the user still has issues taking attendance, they could report the issue to the admin. The attendance report of users who were present, absent, or late will be generated for the admin. This application is currently designed to integrate with canvas platforms for colleges and could be modified to use them for other purposes."),(0,l.kt)("h2",{id:"api-reference"},"API Reference"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Base URL: ",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"local: http://localhost:5000/api/v1"),(0,l.kt)("li",{parentName:"ul"},"online:"))),(0,l.kt)("li",{parentName:"ul"},"Authentication: A token is required to run most of the endpoints. ")),(0,l.kt)("h2",{id:"error-handling"},"Error Handling"),(0,l.kt)("p",null,"The API will return four error types when requests fail:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"400 : Bad Request"),(0,l.kt)("li",{parentName:"ul"},"404 : Resource Not Found"),(0,l.kt)("li",{parentName:"ul"},"401 : Unauthorized user"),(0,l.kt)("li",{parentName:"ul"},"422 : Not Processable")),(0,l.kt)("h2",{id:"endpoints"},"Endpoints"),(0,l.kt)("h3",{id:"token"},"Token"),(0,l.kt)("h3",{id:"post-token"},"POST /token/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Request access token"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request POST 'http://localhost:5000/api/v1/token/' \\\n--header 'Content-Type: application/x-www-form-urlencoded' \\\n--data-urlencode 'canvas_code=a494fde527ea9142856be0134344160fa232274646bf1008421769d394ad6...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "access_token": "...",\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 400 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "access_token": "",\n  "message": "Cound not identify user"\n}\n')))),(0,l.kt)("h3",{id:"professor"},"Professor"),(0,l.kt)("h4",{id:"get-"},"GET /"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return Initial request including info about the professor, current course, current section, registration, role, list of issues, students, schedule, and report"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n"user": {\n    "id": 5,\n    "first_name": "User",\n    "last_name": "Admin",\n    "username": "user@example.com",\n    "email": "user@example.com"\n},\n"current_course": {\n    "canvasId": "",\n    "name": "",\n    "course_number": "",\n    "start_date": null,\n    "end_date": null\n},\n"current_section": {\n    "name": "",\n    "canvasId": "",\n    "course": null,\n    "instructor": null,\n    "students": []\n},\n"registration_completed": {\n    "completed": true\n},\n"role_teacher": true,\n"issues": [],\n"students": [],\n"schedule": [\n    {\n        "id": 1,\n        "course": "Project in Computer Science",\n        "section": "001",\n        "schedule": "Thursday:15:37:40 to 20:37:46; "\n    }\n],\n"report": []\n}\n'))),(0,l.kt)("li",{parentName:"ul"},"code 401")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"get-reporttoday"},"GET /report/today/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return View report of the day"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/report/today/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "today_report": [\n      {\n          "id": 5,\n          "studentName": "Student, Testing",\n          "recordedDate": "2022-11-18",\n          "recordedTime": "19:50:46.497174",\n          "status": "Absent",\n          "displaySection": "001",\n          "displayCourse": "Project in Computer Science"\n      }\n  ]\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"get-statisticsattendance"},"GET /statistics/attendance/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return View detail attendance report of each month"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/statistics/attendance/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "present": [\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      2,\n      0\n  ],\n  "late": [\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0\n  ],\n  "absent": [\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      0,\n      1,\n      0\n  ]\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"get-statisticssections"},"GET /statistics/sections/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return Number of student per section"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/statistics/sections/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "001": 1\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"get-attendancemonitoring"},"GET /attendance/monitoring/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return Show attendance report for current section"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/attendance/monitoring/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "attendance": [\n      {\n          "id": 1,\n          "studentName": "Student, Testing",\n          "recordedDate": "2022-11-17",\n          "recordedTime": "22:04:19.940903",\n          "status": "Present",\n          "displaySection": "001",\n          "displayCourse": "Project in Computer Science"\n      },\n      ...\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"get-courses"},"GET /courses/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return list of courses being taught by this instructor"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/courses/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'[\n  {\n      "id": 1,\n      "canvasId": "2",\n      "name": "Project in Computer Science",\n      "course_number": "CIS 4398",\n      "start_date": "2022-09-01",\n      "end_date": "2022-12-15"\n  },\n  ...\n]\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"student"},"Student"),(0,l.kt)("h3",{id:"get--1"},"GET /"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return initial detail about the students"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "user": {\n      "id": 6,\n      "first_name": "Testing",\n      "last_name": "Student",\n      "username": "testingStudent@gmail.com",\n      "email": "testingStudent@gmail.com"\n  },\n  "current_course": {\n      "canvasId": "",\n      "name": "",\n      "course_number": "",\n      "start_date": null,\n      "end_date": null\n  },\n  "current_section": {\n      "name": "",\n      "canvasId": "",\n      "course": null,\n      "instructor": null,\n      "students": []\n  },\n  "registration_completed": {\n      "completed": false\n  },\n  "role_teacher": false,\n  "issues": [],\n  "report": []\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"get-attendance"},"GET /attendance/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return verification of user's taking attendance for the current section"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request GET 'http://localhost:5000/api/v1/attendance/' \\\n--header 'Authorization: Token ...'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "message": "Attendance already recorded",\n  "authorization": 0\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')))),(0,l.kt)("h3",{id:"post-attendance"},"POST /attendance/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"General:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return submit attendance for the current section"))),(0,l.kt)("li",{parentName:"ul"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"li"}," curl --location --request POST 'http://localhost:5000/api/v1/attendance/' \\\n--header 'Authorization: Token ...' \\\n--form 'emotionImage=@\"image.jpg\"' \\\n--form 'regularImage=@\"image.jpg\"' \\\n--form 'emotion=\"happy\"'")),(0,l.kt)("li",{parentName:"ul"},"Response",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "message": "You have been marked present",\n  "completed": true\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 404 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Student not found"\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 422 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Unable to process attendance."\n}\n')))),(0,l.kt)("h3",{id:"post-registration"},"POST /registration/"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"General:"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Return submit portrait and encode image"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Sample: ",(0,l.kt)("inlineCode",{parentName:"p"}," curl --location --request POST 'http://localhost:5000/api/v1/registration/' \\\n--header 'Authorization: Token ...' \\\n--form 'imageFile=@\"image.png\"'"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Response"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 200")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "file": "image",\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 401 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Authentication credentials were not provided."\n}\n')),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"code 422 ")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'{\n  "detail": "Unable to process registration."\n}\n')))))}m.isMDXComponent=!0}}]);