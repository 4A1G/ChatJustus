(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5],{78739:function(e,t,n){Promise.resolve().then(n.bind(n,68054))},68054:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var s=n(57437),a=n(2265),r=n(9627),i=n(36826);n(20105);var l=n(6137),c=n(88962);let o=(0,a.createContext)({});var u=n(18644),f=n(2203);function d(){let[e,t]=(0,a.useState)(!1),n=(0,a.useContext)(i.hg),[d,h]=(0,a.useState)(!1),m=(0,r.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),x=(0,r.M)("MESSAGES",c.j0),p=(0,r.M)("DATA",{firstContactSummarySchema:{}});return(0,a.useEffect)(()=>(n&&(n.onConnectionChange=h),null==n?void 0:n.connect()),[]),(0,s.jsx)(o.Provider,{value:p,children:(0,s.jsx)(f.C,{leftSidebar:(0,s.jsxs)("div",{className:"flex flex-col content-between h-full",children:[(0,s.jsx)(u.B,{gpt:m,messages:x,showSystem:e,setShowSystem:t}),(0,s.jsxs)("div",{className:"flex flex-wrap justify-between p-2 items-center bg-default-100",children:[(0,s.jsx)(l.R,{}),(0,s.jsx)("div",{className:"flex gap-2"})]})]}),children:(0,s.jsx)(c.en,{history:x.partial?[...x.history,x.partial]:x.history,onSend:e=>{m.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{m.cancelTask({type:"PROMPT"})},isConnected:d,isGenerating:m.runningTasks.includes("PROMPT"),showSystem:e})})})}}},function(e){e.O(0,[306,954,409,457,359,639,971,938,744],function(){return e(e.s=78739)}),_N_E=e.O()}]);