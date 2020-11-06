(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[9],{314:function(e,a,t){"use strict";t.r(a);var l=t(5),n=t(0),r=t.n(n),c=t(32),s=t(46),m=t(39),i=t(12),o=t(37),u=t(45),b=u.a.concat([]);a.default=function(){var e=Object(n.useState)(1),a=Object(l.a)(e,2),t=a[0],d=a[1],E=Object(n.useState)(1),p=Object(l.a)(E,2),T=p[0],f=p[1],h=Object(n.useState)([]),g=Object(l.a)(h,2),x=g[0],v=g[1],C=Object(n.useState)([]),w=Object(l.a)(C,2),j=w[0],N=w[1],y=u.a.length;return Object(n.useEffect)((function(){v(u.a.slice(10*(t-1),10*t))}),[t]),Object(n.useEffect)((function(){N(b.slice(10*(T-1),10*T))}),[T]),r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,null,"Tables"),r.a.createElement(m.a,null),r.a.createElement(s.a,null,"Simple table"),r.a.createElement(i.TableContainer,{className:"mb-8"},r.a.createElement(i.Table,null,r.a.createElement(i.TableHeader,null,r.a.createElement("tr",null,r.a.createElement(i.TableCell,null,"Client"),r.a.createElement(i.TableCell,null,"Amount"),r.a.createElement(i.TableCell,null,"Status"),r.a.createElement(i.TableCell,null,"Date"))),r.a.createElement(i.TableBody,null,x.map((function(e,a){return r.a.createElement(i.TableRow,{key:a},r.a.createElement(i.TableCell,null,r.a.createElement("div",{className:"flex items-center text-sm"},r.a.createElement(i.Avatar,{className:"hidden mr-3 md:block",src:e.avatar,alt:"User avatar"}),r.a.createElement("div",null,r.a.createElement("p",{className:"font-semibold"},e.name),r.a.createElement("p",{className:"text-xs text-gray-600 dark:text-gray-400"},e.job)))),r.a.createElement(i.TableCell,null,r.a.createElement("span",{className:"text-sm"},"$ ",e.amount)),r.a.createElement(i.TableCell,null,r.a.createElement(i.Badge,{type:e.status},e.status)),r.a.createElement(i.TableCell,null,r.a.createElement("span",{className:"text-sm"},new Date(e.date).toLocaleDateString())))})))),r.a.createElement(i.TableFooter,null,r.a.createElement(i.Pagination,{totalResults:y,resultsPerPage:10,onChange:function(e){d(e)},label:"Table navigation"}))),r.a.createElement(s.a,null,"Table with actions"),r.a.createElement(i.TableContainer,{className:"mb-8"},r.a.createElement(i.Table,null,r.a.createElement(i.TableHeader,null,r.a.createElement("tr",null,r.a.createElement(i.TableCell,null,"Client"),r.a.createElement(i.TableCell,null,"Amount"),r.a.createElement(i.TableCell,null,"Status"),r.a.createElement(i.TableCell,null,"Date"),r.a.createElement(i.TableCell,null,"Actions"))),r.a.createElement(i.TableBody,null,j.map((function(e,a){return r.a.createElement(i.TableRow,{key:a},r.a.createElement(i.TableCell,null,r.a.createElement("div",{className:"flex items-center text-sm"},r.a.createElement(i.Avatar,{className:"hidden mr-3 md:block",src:e.avatar,alt:"User avatar"}),r.a.createElement("div",null,r.a.createElement("p",{className:"font-semibold"},e.name),r.a.createElement("p",{className:"text-xs text-gray-600 dark:text-gray-400"},e.job)))),r.a.createElement(i.TableCell,null,r.a.createElement("span",{className:"text-sm"},"$ ",e.amount)),r.a.createElement(i.TableCell,null,r.a.createElement(i.Badge,{type:e.status},e.status)),r.a.createElement(i.TableCell,null,r.a.createElement("span",{className:"text-sm"},new Date(e.date).toLocaleDateString())),r.a.createElement(i.TableCell,null,r.a.createElement("div",{className:"flex items-center space-x-4"},r.a.createElement(i.Button,{layout:"link",size:"icon","aria-label":"Edit"},r.a.createElement(o.EditIcon,{className:"w-5 h-5","aria-hidden":"true"})),r.a.createElement(i.Button,{layout:"link",size:"icon","aria-label":"Delete"},r.a.createElement(o.TrashIcon,{className:"w-5 h-5","aria-hidden":"true"})))))})))),r.a.createElement(i.TableFooter,null,r.a.createElement(i.Pagination,{totalResults:y,resultsPerPage:10,onChange:function(e){f(e)},label:"Table navigation"}))))}},32:function(e,a,t){"use strict";var l=t(0),n=t.n(l);a.a=function(e){var a=e.children;return n.a.createElement("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"},a)}},39:function(e,a,t){"use strict";var l=t(0),n=t.n(l);a.a=function(){return n.a.createElement("a",{className:"flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple",href:"https://github.com/estevanmaito/windmill-dashboard-react"},n.a.createElement("div",{className:"flex items-center"},n.a.createElement("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},n.a.createElement("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})),n.a.createElement("span",null,"Star this project on GitHub")),n.a.createElement("span",null,"View more ",n.a.createElement("span",{dangerouslySetInnerHTML:{__html:"&RightArrow;"}})))}},45:function(e,a,t){"use strict";a.a=[{avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/lokesh_coder/128.jpg",name:"Bama Community Hall Rebuild",job:"$980",amount:989,status:"Completed",date:"Mon Feb 03 2020 04:13:15 GMT-0300 (Brasilia Standard Time)"},{avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/suribbles/128.jpg",name:"Hospital Shelter",job:"$471",amount:471,status:"Completed",date:"Fri Nov 29 2019 10:43:17 GMT-0300 (Brasilia Standard Time)"},{avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/jjsiii/128.jpg",name:"Feed the Children",job:"$754",amount:934,status:"ongoing",date:"Fri Apr 03 2020 03:07:53 GMT-0300 (Brasilia Standard Time)"},{avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg",name:"Birnin Road Project",job:"$3350",amount:5350,status:"ogoing",date:"Fri Jun 21 2019 20:21:55 GMT-0300 (Brasilia Standard Time)"}]},46:function(e,a,t){"use strict";var l=t(0),n=t.n(l);a.a=function(e){var a=e.children;return n.a.createElement("h2",{className:"mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"},a)}}}]);
//# sourceMappingURL=9.9aa39a7a.chunk.js.map