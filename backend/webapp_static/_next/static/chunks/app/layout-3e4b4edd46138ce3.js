(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{6435:function(e,t,n){"use strict";n.d(t,{F:function(){return c},f:function(){return m}});var r=n(2265);let a=["light","dark"],l="(prefers-color-scheme: dark)",s="undefined"==typeof window,o=(0,r.createContext)(void 0),i={setTheme:e=>{},themes:[]},c=()=>{var e;return null!==(e=(0,r.useContext)(o))&&void 0!==e?e:i},m=e=>(0,r.useContext)(o)?r.createElement(r.Fragment,null,e.children):r.createElement(u,e),d=["light","dark"],u=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:n=!0,enableColorScheme:s=!0,storageKey:i="theme",themes:c=d,defaultTheme:m=n?"system":"light",attribute:u="data-theme",value:_,children:b,nonce:$})=>{let[g,S]=(0,r.useState)(()=>f(i,m)),[p,C]=(0,r.useState)(()=>f(i)),k=_?Object.values(_):c,w=(0,r.useCallback)(e=>{let r=e;if(!r)return;"system"===e&&n&&(r=y());let l=_?_[r]:r,o=t?v():null,i=document.documentElement;if("class"===u?(i.classList.remove(...k),l&&i.classList.add(l)):l?i.setAttribute(u,l):i.removeAttribute(u),s){let e=a.includes(m)?m:null,t=a.includes(r)?r:e;i.style.colorScheme=t}null==o||o()},[]),E=(0,r.useCallback)(e=>{S(e);try{localStorage.setItem(i,e)}catch(e){}},[e]),x=(0,r.useCallback)(t=>{C(y(t)),"system"===g&&n&&!e&&w("system")},[g,e]);(0,r.useEffect)(()=>{let e=window.matchMedia(l);return e.addListener(x),x(e),()=>e.removeListener(x)},[x]),(0,r.useEffect)(()=>{let e=e=>{e.key===i&&E(e.newValue||m)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[E]),(0,r.useEffect)(()=>{w(null!=e?e:g)},[e,g]);let T=(0,r.useMemo)(()=>({theme:g,setTheme:E,forcedTheme:e,resolvedTheme:"system"===g?p:g,themes:n?[...c,"system"]:c,systemTheme:n?p:void 0}),[g,E,e,p,n,c]);return r.createElement(o.Provider,{value:T},r.createElement(h,{forcedTheme:e,disableTransitionOnChange:t,enableSystem:n,enableColorScheme:s,storageKey:i,themes:c,defaultTheme:m,attribute:u,value:_,children:b,attrs:k,nonce:$}),b)},h=(0,r.memo)(({forcedTheme:e,storageKey:t,attribute:n,enableSystem:s,enableColorScheme:o,defaultTheme:i,value:c,attrs:m,nonce:d})=>{let u="system"===i,h="class"===n?`var d=document.documentElement,c=d.classList;c.remove(${m.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${n}',s='setAttribute';`,f=o?a.includes(i)&&i?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${i}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",v=(e,t=!1,r=!0)=>{let l=c?c[e]:e,s=t?e+"|| ''":`'${l}'`,i="";return o&&r&&!t&&a.includes(e)&&(i+=`d.style.colorScheme = '${e}';`),"class"===n?i+=t||l?`c.add(${s})`:"null":l&&(i+=`d[s](n,${s})`),i},y=e?`!function(){${h}${v(e)}}()`:s?`!function(){try{${h}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${l}',m=window.matchMedia(t);if(m.media!==t||m.matches){${v("dark")}}else{${v("light")}}}else if(e){${c?`var x=${JSON.stringify(c)};`:""}${v(c?"x[e]":"e",!0)}}${u?"":"else{"+v(i,!1,!1)+"}"}${f}}catch(e){}}()`:`!function(){try{${h}var e=localStorage.getItem('${t}');if(e){${c?`var x=${JSON.stringify(c)};`:""}${v(c?"x[e]":"e",!0)}}else{${v(i,!1,!1)};}${f}}catch(t){}}();`;return r.createElement("script",{nonce:d,dangerouslySetInnerHTML:{__html:y}})},()=>!0),f=(e,t)=>{let n;if(!s){try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},v=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},y=e=>(e||(e=window.matchMedia(l)),e.matches?"dark":"light")},5801:function(e,t,n){Promise.resolve().then(n.bind(n,36294)),Promise.resolve().then(n.t.bind(n,86820,23)),Promise.resolve().then(n.t.bind(n,79959,23)),Promise.resolve().then(n.bind(n,71424)),Promise.resolve().then(n.t.bind(n,21934,23))},36294:function(e,t,n){"use strict";n.r(t),n.d(t,{Providers:function(){return m}});var r=n(57437);n(2265);var a=n(93967),l=n(94625),s=n(46125),o=({children:e,locale:t="en-US",navigate:n,...o})=>{let i=e;return n&&(i=(0,r.jsx)(l.pG,{navigate:n,children:i})),(0,r.jsx)(a.bd,{locale:t,children:(0,r.jsx)(s.N3,{...o,children:i})})},i=n(24033),c=n(6435);function m(e){let{children:t,themeProps:n}=e,a=(0,i.useRouter)();return(0,r.jsx)(o,{navigate:a.push,children:(0,r.jsx)(c.f,{...n,children:t})})}},21934:function(){},79959:function(e){e.exports={style:{fontFamily:"'__Fira_Code_33541e', '__Fira_Code_Fallback_33541e'",fontStyle:"normal"},className:"__className_33541e",variable:"__variable_33541e"}},86820:function(e){e.exports={style:{fontFamily:"'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",fontStyle:"normal"},className:"__className_e66fe9",variable:"__variable_e66fe9"}},24033:function(e,t,n){e.exports=n(15313)}},function(e){e.O(0,[409,125,971,938,744],function(){return e(e.s=5801)}),_N_E=e.O()}]);