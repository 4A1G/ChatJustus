(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[668],{55678:function(e,t,r){Promise.resolve().then(r.bind(r,92370))},92370:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return o}});var n=r(57437),a=r(2265),s=r(15397),i=r(62510);function o(){let[e,t]=(0,a.useState)([]);return(0,a.useEffect)(()=>{fetch("../cases").then(e=>e.json()).then(e=>t(e)).catch(e=>t(JSON.parse('[\n        [\n            "438f6b6d-1a92-483c-b020-7d4b668e4200",\n            "Caspar",\n            "David Chambers",\n            "The client entered into a teddy bear rental agreement with their neighbor, lending a 1.5-meter tall teddy bear for a 3-day birthday party at a rate of 50 euro per day. The neighbor has retained the teddy bear for over two weeks, refusing to return it and to pay the agreed-upon penalty of 100 euro. The teddy bear is valued at more than 1000 euro. The client seeks the return of the teddy bear and compensation for the breach of contract."\n        ],\n        [\n            "4be445c2-f6a9-49e8-afdf-d3c798538059",\n            "Jay",\n            "David Chambers",\n            "The client is experiencing extreme disturbance due to loud music played by the neighbor, which occurs all night every night. The client has attempted to address the issue with the neighbor multiple times without success."\n        ],\n        [\n            "a93be7b7-20b2-49db-8c92-e083bc25f85b",\n            "Violet",\n            "Sofia Sterling",\n            "The client is in the retail sector and is looking to merge with another company. They have not yet initiated discussions or negotiations and are seeking legal assistance with structuring the deal."\n        ],\n        [\n            "df303ca0-79e2-4633-bab0-d054c9a6d394",\n            "Harry Potter",\n            "David Chambers",\n            "The client\'s friend is alleged to have murdered the client\'s cat yesterday. The client has evidence to support their claim but has not yet reported the incident to the police or any other authorities. The client wishes to pursue legal action for damages."\n        ]\n    ]')))},[]),(0,n.jsxs)("div",{className:"flex flex-col gap-5 p-5 w-full h-full overflow-y-scroll",children:[(0,n.jsx)("p",{className:"text-center text-xl",children:"All Legal Cases at the TC Prototype Fair"}),(0,n.jsx)("div",{className:"flex flex-wrap gap-5 justify-center",children:e.map(e=>{let[t,r,a,o]=e;return(0,n.jsxs)("div",{className:"max-w-sm flex flex-col p-4 rounded-lg backdrop-saturate-200 bg-default/30",children:[(0,n.jsxs)("div",{className:"flex flex-row space-x-4",children:[(0,n.jsx)("div",{className:"font-bold",children:"Client:"}),(0,n.jsx)("div",{children:r})]}),(0,n.jsxs)("div",{className:"flex flex-row space-x-4",children:[(0,n.jsx)("div",{className:"font-bold",children:"Lawyer:"}),(0,n.jsx)("div",{children:a})]}),(0,n.jsx)("div",{className:"mt-2",children:o}),(0,n.jsx)("div",{className:"flex mt-4",children:(0,n.jsxs)(s.A,{fullWidth:!0,as:"a",href:"/ChatJustus/demo-first-contact?case_id=".concat(t),children:[(0,n.jsx)(i.dSq,{})," View Case"]})})]},t)})})]})}},30622:function(e,t,r){"use strict";var n=r(2265),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,s={},c=null,d=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:a,type:e,key:c,ref:d,props:s,_owner:o.current}}t.Fragment=s,t.jsx=c,t.jsxs=c},57437:function(e,t,r){"use strict";e.exports=r(30622)},91172:function(e,t,r){"use strict";r.d(t,{w_:function(){return l}});var n=r(2265),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=n.createContext&&n.createContext(a),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},o=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)0>t.indexOf(n[a])&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};function l(e){return function(t){return n.createElement(c,i({attr:i({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,i({key:r},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var r,a=e.attr,s=e.size,l=e.title,c=o(e,["attr","size","title"]),d=s||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,c,{className:r,style:i(i({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),l&&n.createElement("title",null,l),e.children)};return void 0!==s?n.createElement(s.Consumer,null,function(e){return t(e)}):t(a)}}},function(e){e.O(0,[306,565,397,971,938,744],function(){return e(e.s=55678)}),_N_E=e.O()}]);