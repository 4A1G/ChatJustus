(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[860],{73690:function(e,t,n){Promise.resolve().then(n.bind(n,5243))},5243:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var s=n(57437),l=n(2265),a=n(9627),i=n(36826);n(20105);var r=n(6137),c=n(88962),o=n(25879),d=n(21416),u=n(2203),x=n(37931),f=n(62510);function m(){var e;let[t,n]=(0,l.useState)(!1),m=(0,l.useContext)(i.Fb),[h,p]=(0,l.useState)(!1);(0,x.$)(m);let g=(0,a.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),j=(0,a.M)("MESSAGES",c.j0),b=(0,a.M)("FOLLOW_UP",{caseData:{},meetings:[],selectedMeeting:null,chatEnded:!0}),{caseData:v,meetings:y,selectedMeeting:C,setSelectedMeeting:S,chatEnded:N}=b;return(0,l.useEffect)(()=>(m&&(m.onConnectionChange=p),null==m?void 0:m.connect()),[]),(0,s.jsx)(o.p.Provider,{value:b,children:(0,s.jsx)(u.C,{sidebarDefaultVisible:!0,leftSidebar:(0,s.jsxs)("div",{className:"flex flex-col content-between h-full",children:[(0,s.jsx)(d.B,{listTitle:"Your Case Timeline",listContent:(0,s.jsx)(s.Fragment,{children:y.map((e,t)=>{var n;let l,a,{timestamp:i,title:r}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("button",{className:"flex flex-col bg-default-50 rounded-lg p-3 hover:scale-105 transition-all duration-200 ease-in-out",onClick:()=>S(i),children:[(0,s.jsx)("div",{className:"text-xs ".concat(i==C?"text-primary/100":"text-default-700"),children:"".concat((l=(n=t+1)%10,a=n%100,1===l&&11!==a?n+"st":2===l&&12!==a?n+"nd":3===l&&13!==a?n+"rd":n+"th")," Meeting on ").concat(new Date(1e3*i).toLocaleDateString())}),(0,s.jsx)("div",{className:"font-serif text-left ".concat(i==C?"text-primary/100 font-bold":"text-default-700"),children:r})]})})})}),gpt:g,messages:j,showSystem:t,setShowSystem:n}),(0,s.jsxs)("div",{className:"flex flex-wrap justify-between p-2 items-center bg-default-100",children:[(0,s.jsx)(r.R,{}),(0,s.jsx)("div",{className:"flex gap-2"})]})]}),children:(0,s.jsx)(c.en,{introTitle:"Welcome back".concat(v.client?", "+v.client:" to ChatJustus","!"),introContent:C?y.find(e=>{let{timestamp:t}=e;return t==C}).summary:"*Select a meeting on your case timeline!*",history:C&&C==y[y.length-1].timestamp?j.partial?[...j.history,j.partial]:j.history:(null===(e=y.find(e=>{let{timestamp:t}=e;return t==C}))||void 0===e?void 0:e.chat)||[],onSend:e=>{g.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{g.cancelTask({type:"PROMPT"})},isConnected:h,isGenerating:g.runningTasks.includes("PROMPT"),isDisabled:(0,s.jsxs)("p",{className:"font-bold text-center",children:[(0,s.jsx)(f.dSq,{className:"text-xl inline m-1"})," Example Legal Case - Read Only"]}),showSystem:t})})})}}},function(e){e.O(0,[306,954,409,1,565,397,457,835,898,971,938,744],function(){return e(e.s=73690)}),_N_E=e.O()}]);