"use strict";(self.webpackChunktu_cis_4398_docs_template=self.webpackChunktu_cis_4398_docs_template||[]).push([[9617],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,h=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return n?r.createElement(h,o(o({ref:t},c),{},{components:n})):r.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},70200:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return d}});var r=n(83117),a=n(80102),i=(n(67294),n(3905)),o=["components"],s={sidebar_position:4},l="Features and Requirements",u={unversionedId:"requirements/features-and-requirements",id:"requirements/features-and-requirements",title:"Features and Requirements",description:"Functional Requirements",source:"@site/docs/requirements/features-and-requirements.md",sourceDirName:"requirements",slug:"/requirements/features-and-requirements",permalink:"/project-attendance-face-recognition/docs/requirements/features-and-requirements",draft:!1,editUrl:"https://github.com/Capstone-Projects-2022-Fall/project-attendance-face-recognition/edit/main/documentation/docs/requirements/features-and-requirements.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"General Requirements",permalink:"/project-attendance-face-recognition/docs/requirements/general-requirements"},next:{title:"Use-case descriptions",permalink:"/project-attendance-face-recognition/docs/requirements/use-case-descriptions"}},c={},d=[{value:"Functional Requirements",id:"functional-requirements",level:2},{value:"Login and Access",id:"login-and-access",level:3},{value:"Picture Upload",id:"picture-upload",level:3},{value:"Known User",id:"known-user",level:3},{value:"Face Recognition",id:"face-recognition",level:3},{value:"Help with issues",id:"help-with-issues",level:3},{value:"Settings",id:"settings",level:3},{value:"Reports",id:"reports",level:3},{value:"Non-Functional Requirements",id:"non-functional-requirements",level:2}],p={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"features-and-requirements"},"Features and Requirements"),(0,i.kt)("h2",{id:"functional-requirements"},"Functional Requirements"),(0,i.kt)("h3",{id:"login-and-access"},"Login and Access"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Any user will need to login to canvas using their college credentials to access the attendance recognition system application"),(0,i.kt)("li",{parentName:"ul"},"Canvas will have the Attendance Face Recognition application installed into the course, letting the users access it from the navigation menu in the course")),(0,i.kt)("h3",{id:"picture-upload"},"Picture Upload"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The attendance recognition application will not recognize a new student user if there is no data of the user in the system"),(0,i.kt)("li",{parentName:"ul"},"Attendance Face Recognition application will let a user, who is a new student upload a few pictures to add into dataset, for the application to recognize the student user"),(0,i.kt)("li",{parentName:"ul"},"After the upload is successful, the new student can take attendance in the application normally")),(0,i.kt)("h3",{id:"known-user"},"Known User"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The user will be redirected to the AFR application home page once they access the application through canvas and they could choose to mark their attendance using face recognition or view their attendance records")),(0,i.kt)("h3",{id:"face-recognition"},"Face Recognition"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"When a student user tries to take attendance, and the system recognizes them, they will be notified by a greeting message. At the same time, if the user is not recognized, AFR will display an error message that they are not recognized"),(0,i.kt)("li",{parentName:"ul"},"AFR can identify people who are trying to cheat to mark their attendance and only accepts the presence of live people infront of the webcam")),(0,i.kt)("h3",{id:"help-with-issues"},"Help with issues"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If the student user has issues recognizing their face after multiple tries, there is a button 'report an issue' that notifies there is an issue and can send their manually captured pictures to the professor"),(0,i.kt)("li",{parentName:"ul"},"Professor would be able to see the issues created by the students and manage the attendance based on the issues reported")),(0,i.kt)("h3",{id:"settings"},"Settings"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"On the first class during setup, the professor can set the days and time for the attendance to be open on the days for the class")),(0,i.kt)("h3",{id:"reports"},"Reports"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Student user will be able to view their attendance report from the reports page on the application for their class"),(0,i.kt)("li",{parentName:"ul"},"Professor will be able to view the attendance report of their students for any specifc class and section"),(0,i.kt)("li",{parentName:"ul"},"The attendance report also shows the status of student attendance as present, late, or absent")),(0,i.kt)("h2",{id:"non-functional-requirements"},"Non-Functional Requirements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Attendance Face Recognition application will have a very simple and very user-friendly interface with just couple tabs and buttons on the pages to mark attendance and view the record. The student data will be secure as it is integrated with canvas. The buttons will also be used to notify or alert when needed."),(0,i.kt)("li",{parentName:"ul"},"AFR application must be added into the canvas course to use it for any course. Installation instructions will be provided for the admins to install the AFR application into the canvas courses")))}m.isMDXComponent=!0}}]);