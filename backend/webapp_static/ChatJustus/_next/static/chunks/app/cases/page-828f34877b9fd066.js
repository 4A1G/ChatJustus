(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[668],{55678:function(e,t,r){Promise.resolve().then(r.bind(r,92370))},92370:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var n=r(57437),l=r(2265),s=r(15397),o=r(62510);function c(){let[e,t]=(0,l.useState)([]);return(0,l.useEffect)(()=>{fetch("../cases").then(e=>e.json()).then(e=>t(e)).catch(e=>console.error(e))},[]),(0,n.jsxs)("div",{className:"flex flex-col gap-5 p-5 w-full h-full overflow-y-scroll",children:[(0,n.jsx)("p",{className:"text-center text-xl",children:"All Legal Cases at the TC Prototype Fair"}),(0,n.jsx)("div",{className:"flex flex-wrap gap-5 justify-center",children:e.map(e=>{let[t,r,l,c]=e;return(0,n.jsxs)("div",{className:"max-w-sm flex flex-col p-4 rounded-lg backdrop-saturate-200 bg-default/30",children:[(0,n.jsxs)("div",{className:"flex flex-row space-x-4",children:[(0,n.jsx)("div",{className:"font-bold",children:"Client:"}),(0,n.jsx)("div",{children:r})]}),(0,n.jsxs)("div",{className:"flex flex-row space-x-4",children:[(0,n.jsx)("div",{className:"font-bold",children:"Lawyer:"}),(0,n.jsx)("div",{children:l})]}),(0,n.jsx)("div",{className:"mt-2",children:c}),(0,n.jsx)("div",{className:"flex mt-4",children:(0,n.jsxs)(s.A,{fullWidth:!0,as:"a",href:"/ChatJustus/demo-first-contact?case_id=".concat(t),children:[(0,n.jsx)(o.dSq,{})," View Case"]})})]},t)})})]})}},30622:function(e,t,r){"use strict";var n=r(2265),l=Symbol.for("react.element"),s=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,r){var n,s={},i=null,f=null;for(n in void 0!==r&&(i=""+r),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(f=t.ref),t)o.call(t,n)&&!a.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:l,type:e,key:i,ref:f,props:s,_owner:c.current}}t.Fragment=s,t.jsx=i,t.jsxs=i},57437:function(e,t,r){"use strict";e.exports=r(30622)},91172:function(e,t,r){"use strict";r.d(t,{w_:function(){return a}});var n=r(2265),l={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=n.createContext&&n.createContext(l),o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var l in t=arguments[r])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)},c=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)0>t.indexOf(n[l])&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};function a(e){return function(t){return n.createElement(i,o({attr:o({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,o({key:r},t.attr),e(t.child))})}(e.child))}}function i(e){var t=function(t){var r,l=e.attr,s=e.size,a=e.title,i=c(e,["attr","size","title"]),f=s||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,l,i,{className:r,style:o(o({color:e.color||t.color},t.style),e.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),a&&n.createElement("title",null,a),e.children)};return void 0!==s?n.createElement(s.Consumer,null,function(e){return t(e)}):t(l)}}},function(e){e.O(0,[306,565,397,971,938,744],function(){return e(e.s=55678)}),_N_E=e.O()}]);