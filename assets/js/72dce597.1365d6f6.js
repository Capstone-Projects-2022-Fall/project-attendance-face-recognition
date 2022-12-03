"use strict";(self.webpackChunktu_cis_4398_docs_template=self.webpackChunktu_cis_4398_docs_template||[]).push([[4033],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return d}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(a),d=r,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return a?n.createElement(f,i(i({ref:t},c),{},{components:a})):n.createElement(f,i({ref:t},c))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},99801:function(e,t,a){a.r(t),a.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var n=a(83117),r=a(80102),o=(a(67294),a(3905)),i=["components"],l={sidebar_position:2},s="Tasks",p={unversionedId:"development-plan/tasks",id:"development-plan/tasks",title:"Tasks",description:"1.\tIntegrate the web application into Canvas",source:"@site/docs/development-plan/tasks.md",sourceDirName:"development-plan",slug:"/development-plan/tasks",permalink:"/project-attendance-face-recognition/docs/development-plan/tasks",draft:!1,editUrl:"https://github.com/Capstone-Projects-2022-Fall/project-attendance-face-recognition/edit/main/documentation/docs/development-plan/tasks.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Activities",permalink:"/project-attendance-face-recognition/docs/development-plan/activities"},next:{title:"Schedule",permalink:"/project-attendance-face-recognition/docs/development-plan/schedule"}},c={},u=[],m={toc:u};function d(e){var t=e.components,a=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"tasks"},"Tasks"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Integrate the web application into Canvas",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Create a sample course on Canvas (~1)"),(0,o.kt)("li",{parentName:"ul"},"Pull and initialize the Canvas docker image (~2)"),(0,o.kt)("li",{parentName:"ul"},"Seek permission or find a way to add our application to the created Canvas course (~3)"))),(0,o.kt)("li",{parentName:"ol"},"Create a layout with the necessary tabs for navigation",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Create a welcome home page (~2)"),(0,o.kt)("li",{parentName:"ul"},"Create a button and page for the student to take attendance (~2)"),(0,o.kt)("li",{parentName:"ul"},"Create a button and page for report (~2)"),(0,o.kt)("li",{parentName:"ul"},"Add exit button (~1)"))),(0,o.kt)("li",{parentName:"ol"},"Create the backend and database communication ",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Create a MySQL database schema (~1)"),(0,o.kt)("li",{parentName:"ul"},"Create an Amazon LightSail private instance (~1)"),(0,o.kt)("li",{parentName:"ul"},"Create and initialize an Amazon LightSail database (~1)"),(0,o.kt)("li",{parentName:"ul"},"Install the required libraries and tools to work on the back end (~2)"),(0,o.kt)("li",{parentName:"ul"},"Write code for face recognition, encoding, and database inclusion (~5)"),(0,o.kt)("li",{parentName:"ul"},"Establish a connection between the face recognition and database to function accurately (~3)"))),(0,o.kt)("li",{parentName:"ol"},"Create an algorithm that detects users\u2019 face in any different angle",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Research for any algorithms that accurately recognizes faces using features in the face (~2)"),(0,o.kt)("li",{parentName:"ul"},"Implement a method to encode all images in the dataset (~2)"),(0,o.kt)("li",{parentName:"ul"},"Create it in a way that it compares both faces using features (~2)"))),(0,o.kt)("li",{parentName:"ol"},"Create a scheduler to allow a professor to set the time and days of the week",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Create a button for the professor to create a schedule (~1)"),(0,o.kt)("li",{parentName:"ul"},"Create a form for the professor to select start time, end time, and day of the week for the course section (~2)"),(0,o.kt)("li",{parentName:"ul"},"Allow a method to have the professor select multiple days of the week (~1)"))),(0,o.kt)("li",{parentName:"ol"},"Create an attendance report generator for the professor",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Display a table from the data with a list of student attendances for the class (~2)"),(0,o.kt)("li",{parentName:"ul"},"Create an input field to search for any specific student (~1)"),(0,o.kt)("li",{parentName:"ul"},"Write a search algorithm to display search results (~2)"))),(0,o.kt)("li",{parentName:"ol"},"Create a form for students to report any issues",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Create a form that shows up when clicked on report issue button (~2)"),(0,o.kt)("li",{parentName:"ul"},"Create text space to write down the issue (~1)"),(0,o.kt)("li",{parentName:"ul"},"Create submit button (~1)"))),(0,o.kt)("li",{parentName:"ol"},"Create a method for professors to approve or reject student issues",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Make the submitted issue show up on the professor's application home page (~1)"),(0,o.kt)("li",{parentName:"ul"},"Create buttons to accept or reject the issue (~1)"),(0,o.kt)("li",{parentName:"ul"},"Create an option to manually adjust the attendance of that student (~1)"))),(0,o.kt)("li",{parentName:"ol"},"Create a summary report for students to view their own attendance",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Make the report tab in the home page on students\u2019 view clickable (~1)"),(0,o.kt)("li",{parentName:"ul"},"Collect the data stored (~1)"),(0,o.kt)("li",{parentName:"ul"},"Display the up-to-date attendance report of each student (~2)"))),(0,o.kt)("li",{parentName:"ol"},"Integrate the application with Canvas assignments to allow for autograde",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Automatically generate an attendance assignment for the professor's section if needed (~2)"),(0,o.kt)("li",{parentName:"ul"},"Connect Canvas with the web application to give full marks to students who are present (~2)"),(0,o.kt)("li",{parentName:"ul"},"Provide partial or no credit if the student is late or absent (~1)"))),(0,o.kt)("li",{parentName:"ol"},"Testing",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Perform automated API testing, Postmates and Jest framework for Integration testing (~3)"),(0,o.kt)("li",{parentName:"ul"},"Create unit tests using Django and Jest for all the logical checks (~3)"),(0,o.kt)("li",{parentName:"ul"},"Perform acceptance testing to check the flow of use cases (~2)")))))}d.isMDXComponent=!0}}]);