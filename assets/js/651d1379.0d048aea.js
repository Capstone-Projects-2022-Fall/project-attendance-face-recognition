"use strict";(self.webpackChunktu_cis_4398_docs_template=self.webpackChunktu_cis_4398_docs_template||[]).push([[7607],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,h=d["".concat(l,".").concat(m)]||d[m]||p[m]||s;return n?a.createElement(h,i(i({ref:t},u),{},{components:n})):a.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var c=2;c<s;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4757:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return p}});var a=n(83117),r=n(80102),s=(n(67294),n(3905)),i=["components"],o={sidebar_position:5},l="Use-case descriptions",c={unversionedId:"requirements/use-case-descriptions",id:"requirements/use-case-descriptions",title:"Use-case descriptions",description:"New Student",source:"@site/docs/requirements/use-case-descriptions.md",sourceDirName:"requirements",slug:"/requirements/use-case-descriptions",permalink:"/project-attendance-face-recognition/docs/requirements/use-case-descriptions",draft:!1,editUrl:"https://github.com/Capstone-Projects-2022-Fall/project-attendance-face-recognition/edit/main/documentation/docs/requirements/use-case-descriptions.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"docsSidebar",previous:{title:"Features and Requirements",permalink:"/project-attendance-face-recognition/docs/requirements/features-and-requirements"},next:{title:"Software Development Plan",permalink:"/project-attendance-face-recognition/docs/category/software-development-plan"}},u={},p=[{value:"New Student",id:"new-student",level:2},{value:"Known Student",id:"known-student",level:2},{value:"Professor",id:"professor",level:2}],d={toc:p};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,s.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"use-case-descriptions"},"Use-case descriptions"),(0,s.kt)("h2",{id:"new-student"},"New Student"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"User Story:\nAs a new student using the attendance face recognition system for the first time, I want to access the attendance.",(0,s.kt)("br",null))),(0,s.kt)("p",null,"Use Case:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"If the user is a new student, they login to canvas using their credentials"),(0,s.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,s.kt)("li",{parentName:"ul"},"They authorize the access of the AFR application"),(0,s.kt)("li",{parentName:"ul"},"They then upload a few pictures of themself to add to the data set"),(0,s.kt)("li",{parentName:"ul"},"Once finished, they can go to home and click on take attendance"),(0,s.kt)("li",{parentName:"ul"},"The student gives permission for the application to use the camera and record their attendance"),(0,s.kt)("li",{parentName:"ul"},"Once the attendance is recorded, they can exit out of the application")),(0,s.kt)("h2",{id:"known-student"},"Known Student"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"User story:\nAs an enrolled student, I can directly login through canvas and use it for attendance.",(0,s.kt)("br",null))),(0,s.kt)("p",null,"Use case:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"If the user is a student, they login to canvas using their credentials"),(0,s.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,s.kt)("li",{parentName:"ul"},"The student clicks on take attendance"),(0,s.kt)("li",{parentName:"ul"},"The student gives permission for the application to use the camera"),(0,s.kt)("li",{parentName:"ul"},"The student looks at the camera"),(0,s.kt)("li",{parentName:"ul"},"The system matches the face"),(0,s.kt)("li",{parentName:"ul"},"The system marks the attendance as present")),(0,s.kt)("ol",{start:2},(0,s.kt)("li",{parentName:"ol"},"User Story:\nAs a student, if I\u2019m unable to get my attendance recorded after multiple attempts, I want an alternative method to verify my presence and let the professor know that I'm in class.",(0,s.kt)("br",null))),(0,s.kt)("p",null,"Use Case:\nIf the user is a student, they login to canvas using their credentials"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,s.kt)("li",{parentName:"ul"},"The student clicks on take attendance"),(0,s.kt)("li",{parentName:"ul"},"The student gives permission for the application to use the camera"),(0,s.kt)("li",{parentName:"ul"},"Then the student looks at the camera to record the attendance"),(0,s.kt)("li",{parentName:"ul"},"The system has trouble recognizing the student and displays error message, even after multiple tries"),(0,s.kt)("li",{parentName:"ul"},"The student then clicks the \u2018Need Help\u2019 button to report the issue to the professor"),(0,s.kt)("li",{parentName:"ul"},"The professor gets notified that the specific student user has an issue marking their attendance")),(0,s.kt)("h2",{id:"professor"},"Professor"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"User story:\nAs a professor, I want to have attendance taken automatically at a specific time of the class.",(0,s.kt)("br",null),"\nUse case:")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"An admin user signs in through canvas"),(0,s.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,s.kt)("li",{parentName:"ul"},"As they are redirected to the home page, they select the desired class"),(0,s.kt)("li",{parentName:"ul"},"Next, they set a recurring days and time for attendance during beginning of the semester"),(0,s.kt)("li",{parentName:"ul"},"The system opens the attendance automatically to each student for that set time every class")),(0,s.kt)("ol",{start:2},(0,s.kt)("li",{parentName:"ol"},"User story:\nAs a professor, I want to have real time access of the attendance and get a report of the students\u2019 attendance.",(0,s.kt)("br",null))),(0,s.kt)("p",null,"Use case: "),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"An admin user signs in through canvas"),(0,s.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,s.kt)("li",{parentName:"ul"},"As they are redirected to the home page and once the class is finished, they click on the 'Reports' tab"),(0,s.kt)("li",{parentName:"ul"},"Then they select a specific class to view the report"),(0,s.kt)("li",{parentName:"ul"},"Once selected, the report can be seen"),(0,s.kt)("li",{parentName:"ul"},"If they want to make any adjustments, they can click on \u2018Record manually\u2019 to make changes")),(0,s.kt)("ol",{start:3},(0,s.kt)("li",{parentName:"ol"},"User Story:\nAs a professor, I want to be notified/informed if any student has issues taking attendance.",(0,s.kt)("br",null))),(0,s.kt)("p",null,"Use Case:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"An admin user signs in through canvas"),(0,s.kt)("li",{parentName:"ul"},"They click on attendance from the navigation menu on the left"),(0,s.kt)("li",{parentName:"ul"},"As they are redirected to the home page, they click on the 'Issues' tab"),(0,s.kt)("li",{parentName:"ul"},"They can see the issues reported by the students from different classes and sections"),(0,s.kt)("li",{parentName:"ul"},"They can click to view the issues")))}m.isMDXComponent=!0}}]);