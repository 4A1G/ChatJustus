(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[514],{78136:function(e,s,n){Promise.resolve().then(n.bind(n,33142))},33142:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return f}});var t=n(57437),a=n(2265),r=n(9627),i=n(36826);n(20105);var l=n(6137),c=n(88962),o=n(80200),u=n(18644),d=n(2203);function f(){let[e,s]=(0,a.useState)(!1),n=(0,a.useContext)(i.hg),[f,h]=(0,a.useState)(!1),m=(0,r.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),p=(0,r.M)("MESSAGES",c.j0),x=(0,r.M)("FIRST_CONTACT",{chatEnded:!1,summarySchema:{},summary:{}});return(0,a.useEffect)(()=>(n&&(n.onConnectionChange=h),null==n?void 0:n.connect()),[]),(0,t.jsx)(o.R.Provider,{value:x,children:(0,t.jsx)(d.C,{leftSidebar:(0,t.jsxs)("div",{className:"flex flex-col content-between h-full",children:[(0,t.jsx)(u.B,{gpt:m,messages:p,showSystem:e,setShowSystem:s}),(0,t.jsxs)("div",{className:"flex flex-wrap justify-between p-2 items-center bg-default-100",children:[(0,t.jsx)(l.R,{}),(0,t.jsx)("div",{className:"flex gap-2"})]})]}),children:(0,t.jsx)(c.en,{history:p.partial?[...p.history,p.partial]:p.history,onSend:e=>{m.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{m.cancelTask({type:"PROMPT"})},isConnected:f,isGenerating:m.runningTasks.includes("PROMPT"),showSystem:e})})})}}},function(e){e.O(0,[306,954,409,457,359,639,971,938,744],function(){return e(e.s=78136)}),_N_E=e.O()}]);