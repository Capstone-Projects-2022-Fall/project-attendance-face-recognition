"use strict";(self.webpackChunktu_cis_4398_docs_template=self.webpackChunktu_cis_4398_docs_template||[]).push([[8794],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(n),m=o,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},49380:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return d}});var r=n(83117),o=n(80102),a=(n(67294),n(3905)),i=["components"],c={sidebar_position:2},s="System Block Diagram",l={unversionedId:"requirements/system-block-diagram",id:"requirements/system-block-diagram",title:"System Block Diagram",description:"image",source:"@site/docs/requirements/system-block-diagram.md",sourceDirName:"requirements",slug:"/requirements/system-block-diagram",permalink:"/project-attendance-face-recognition/docs/requirements/system-block-diagram",draft:!1,editUrl:"https://github.com/Capstone-Projects-2022-Fall/project-attendance-face-recognition/edit/main/documentation/docs/requirements/system-block-diagram.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"System Overview",permalink:"/project-attendance-face-recognition/docs/requirements/system-overview"},next:{title:"General Requirements",permalink:"/project-attendance-face-recognition/docs/requirements/general-requirements"}},u={},d=[],p={toc:d};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"system-block-diagram"},"System Block Diagram"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/78066498/202242391-510fb363-9dba-45f7-a624-985cd316e85a.png",alt:"image"})),(0,a.kt)("p",null,"If a student user is new to the AFR application, once they login through Canvas, the application will ask them to scan or upload multiple portrait photos of themselves which will be encoded and save to the application database. These photos will then be store in an AWS bucket.\nOpenCV will detect, transform, and crop these images which will be encoded by dlib.\nThe embedded images will be written on a file along with each student's ID. These will be stored in an Amazon S3 bucket.\nDuring the attendance, the application will ask the user to scan their face using their webcam in order to be marked as present. Once a student user's face has been scanned, it will send the captured picture to the backend. Here it will be transformed and cropped by OpenCV. Then, dlib will encode the image. The encoded image will be compared with other encoded photos to find a match using the Face_recognition package. If a match is able to be found, the student will be marked as present. Once the class is finished, the attendance report showcasing records of the students' attendances will be sent to the professor. The data for this will be associated with and from canvas. The front end will be developed using HTML, CSS, React, JavaScript, and Django. We initially plan on hosting it on AWS services, but might explore other options and choose the better one."))}m.isMDXComponent=!0}}]);