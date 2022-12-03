"use strict";(self.webpackChunktu_cis_4398_docs_template=self.webpackChunktu_cis_4398_docs_template||[]).push([[7607],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(67294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,r=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),h=s,m=p["".concat(l,".").concat(h)]||p[h]||d[h]||r;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function h(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=n.length,o=new Array(r);o[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:s,o[1]=i;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4757:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return d}});var a=n(83117),s=n(80102),r=(n(67294),n(3905)),o=["components"],i={sidebar_position:5},l="Use-case descriptions",c={unversionedId:"requirements/use-case-descriptions",id:"requirements/use-case-descriptions",title:"Use-case descriptions",description:"New Student",source:"@site/docs/requirements/use-case-descriptions.md",sourceDirName:"requirements",slug:"/requirements/use-case-descriptions",permalink:"/project-attendance-face-recognition/docs/requirements/use-case-descriptions",draft:!1,editUrl:"https://github.com/Capstone-Projects-2022-Fall/project-attendance-face-recognition/edit/main/documentation/docs/requirements/use-case-descriptions.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"docsSidebar",previous:{title:"Features and Requirements",permalink:"/project-attendance-face-recognition/docs/requirements/features-and-requirements"},next:{title:"Software Development Plan",permalink:"/project-attendance-face-recognition/docs/category/software-development-plan"}},u={},d=[{value:"New Student",id:"new-student",level:2},{value:"Known Student",id:"known-student",level:2},{value:"Professor",id:"professor",level:2}],p={toc:d};function h(e){var t=e.components,n=(0,s.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"use-case-descriptions"},"Use-case descriptions"),(0,r.kt)("h2",{id:"new-student"},"New Student"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"User Story:\nAs a new student using the attendance face recognition system for the first time, I want to access the attendance.")),(0,r.kt)("p",null,"Use Case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If the user is a new student, they login to Canvas using their credentials"),(0,r.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,r.kt)("li",{parentName:"ul"},"They authorize the access of the AFR application"),(0,r.kt)("li",{parentName:"ul"},"They then upload a few pictures of themself to add to the data set"),(0,r.kt)("li",{parentName:"ul"},"Once finished, they can go to home and click on take attendance"),(0,r.kt)("li",{parentName:"ul"},"The student gives permission for the application to use the camera and record their attendance"),(0,r.kt)("li",{parentName:"ul"},"Once the attendance is recorded, they can exit out of the application")),(0,r.kt)("h2",{id:"known-student"},"Known Student"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"User story:\nAs an enrolled student, I can access AFR from Canvas and use it to take attendance.")),(0,r.kt)("p",null,"Use Case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If the user is a student, they login to Canvas using their credentials"),(0,r.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,r.kt)("li",{parentName:"ul"},"The student clicks on take attendance"),(0,r.kt)("li",{parentName:"ul"},"The student gives permission for the application to use the camera"),(0,r.kt)("li",{parentName:"ul"},"The student looks at the camera"),(0,r.kt)("li",{parentName:"ul"},"The system matches the face"),(0,r.kt)("li",{parentName:"ul"},"The system marks the attendance as present")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"User Story:\nAs a student, if I\u2019m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know that I'm in class.")),(0,r.kt)("p",null,"Use Case:\nIf the user is a student, they login to Canvas using their credentials"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,r.kt)("li",{parentName:"ul"},"The student clicks on take attendance"),(0,r.kt)("li",{parentName:"ul"},"The student gives permission for the application to use the camera"),(0,r.kt)("li",{parentName:"ul"},"Then the student looks at the camera to record the attendance"),(0,r.kt)("li",{parentName:"ul"},"The system has trouble recognizing the student and displays an error message"),(0,r.kt)("li",{parentName:"ul"},"The system allows the student to attempt to take attendance again using another random emotion"),(0,r.kt)("li",{parentName:"ul"},"The student attempts to take attendance again"),(0,r.kt)("li",{parentName:"ul"},"After 5 attempts, the system stops the student from submitting any more attendance attempts"),(0,r.kt)("li",{parentName:"ul"},'After 5 attempts, the student can click the "Report Issue" button to report an issue to the professor'),(0,r.kt)("li",{parentName:"ul"},'The student fills in the issue\'s subject and body and clicks the "Submit Issue" button'),(0,r.kt)("li",{parentName:"ul"},"The student is returned to the AFR Home page"),(0,r.kt)("li",{parentName:"ul"},"The professor receives the issue and can view it in their AFR Home page")),(0,r.kt)("h2",{id:"professor"},"Professor"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"User story:\nAs a professor, I want to have attendance taken automatically at a specific class time.")),(0,r.kt)("p",null,"Use case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A professor signs in to AFR through Canvas"),(0,r.kt)("li",{parentName:"ul"},'They click on "Course & Sections" to view the courses and sections they are teaching'),(0,r.kt)("li",{parentName:"ul"},'They click on "Add Schedule for Class" to add a schedule'),(0,r.kt)("li",{parentName:"ul"},"They select the section, weekday(s) the class is held, class start time, and class end time"),(0,r.kt)("li",{parentName:"ul"},"The system then opens attendance automatically to each student enrolled in that section at that time every time class is held")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"User story:\nAs a professor, I want to have real time access of students' attendance and get a report of the students\u2019 attendance.",(0,r.kt)("br",null))),(0,r.kt)("p",null,"Use case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A professor signs in to AFR through Canvas"),(0,r.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,r.kt)("li",{parentName:"ul"},"As they are redirected to the home page and once the class is finished, they click on the 'Reports' tab"),(0,r.kt)("li",{parentName:"ul"},"Then they select a specific class to view the report"),(0,r.kt)("li",{parentName:"ul"},"Once selected, the report can be seen"),(0,r.kt)("li",{parentName:"ul"},"If they want to make any adjustments, they can click on \u2018Record manually\u2019 to make changes")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"User Story:\nAs a professor, I want to be notified/informed if any student has issues taking attendance.")),(0,r.kt)("p",null,"Use Case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A professor signs in to AFR through Canvas"),(0,r.kt)("li",{parentName:"ul"},"As they are redirected to the home page, they can see all issues reported by students from different classes and sections"),(0,r.kt)("li",{parentName:"ul"},"They can choose which issues to accept (marking the attendance as present) and which issues to reject (marking the attendance as absent)"),(0,r.kt)("li",{parentName:"ul"},"The system removes the issue once it has been accepted or rejected")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"User Story:\nAs a professor, I want attendance grades in Canvas to be automatically updated when attendance is taken.",(0,r.kt)("br",null))),(0,r.kt)("p",null,"Use Case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A professor signs in to AFR through Canvas"),(0,r.kt)("li",{parentName:"ul"},"As the professor is signing in, AFR will automatically create attendance assignments for all courses the professor is teaching if they did not exist already"),(0,r.kt)("li",{parentName:"ul"},"Once a student has taken their attendance through AFR, their attendance grade will automatically be updated in Canvas"),(0,r.kt)("li",{parentName:"ul"},"The professor can view the gradebook in Canvas to see attendance grades without having to import anything themselves")),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"User story:\nAs a professor, I want to be able to import all sections for courses I am teaching, and the corresponding students for those sections, into AFR.")),(0,r.kt)("p",null,"Use case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A professor signs in to AFR through Canvas"),(0,r.kt)("li",{parentName:"ul"},'They click on "Course & Sections" to view the courses and sections they are teaching'),(0,r.kt)("li",{parentName:"ul"},'They click on "Sync with Canvas"'),(0,r.kt)("li",{parentName:"ul"},"The system automatically adds all sections, courses, and students that have logged onto AFR enrolled in those sections into AFR"),(0,r.kt)("li",{parentName:"ul"},"They can repeatedly sync as the semester progresses to continually add students as they log into AFR for the first time")))}h.isMDXComponent=!0}}]);