(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[953],{8373:function(e,n,s){Promise.resolve().then(s.bind(s,33428))},33428:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return m}});var t=s(57437),a=s(2265),i=s(9627),l=s(36826);s(20105);var o=s(6137),r=s(88962),c=s(80200),u=s(21416),d=s(2203),h=s(37931),f=s(15397),y=s(62510);function m(){let[e,n]=(0,a.useState)(!1),s=(0,a.useContext)(l.Fb),[m,p]=(0,a.useState)(!1);(0,h.$)(s);let w=(0,i.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),x=(0,i.M)("MESSAGES",r.j0),g=(0,i.M)("FIRST_CONTACT",{chatEnded:!1,summarySchema:{},summary:{}});return(0,a.useEffect)(()=>{s&&(s.onConnectionChange=p)},[]),(0,t.jsx)(c.p.Provider,{value:g,children:(0,t.jsx)(d.C,{leftSidebar:(0,t.jsxs)("div",{className:"flex flex-col content-between h-full",children:[(0,t.jsx)(u.B,{gpt:w,messages:x,showSystem:e,setShowSystem:n}),(0,t.jsxs)("div",{className:"flex flex-wrap justify-between p-2 items-center bg-default-100",children:[(0,t.jsx)(o.R,{}),(0,t.jsx)("div",{className:"flex gap-2"})]})]}),children:(0,t.jsx)(r.en,{introTitle:"Welcome to ChatJustus!",introContent:"\nDo you have any legal questions? I can help you with:\n- Answering your questions about the law\n- Your legal situation\n- Finding Lawyers at *Sterling Legal Associates*, specialized for your case\n- Forwarding your case to the lawyer\n\n*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*\n              ",history:x.partial?[...x.history,x.partial]:x.history,onSend:e=>{w.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{w.cancelTask({type:"PROMPT"})},isConnected:m,isGenerating:w.runningTasks.includes("PROMPT"),isDisabled:(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsxs)("p",{className:"font-bold",children:[(0,t.jsx)(y.dSq,{className:"text-xl inline m-1"})," Example Legal Case - Read Only"]}),(0,t.jsxs)(f.A,{as:"a",href:window.location.href.replace("first-contact","follow-up"),children:["Go to Meeting Follow-Up ",(0,t.jsx)(y.Z1Y,{})]})]}),showSystem:e})})})}}},function(e){e.O(0,[306,954,409,1,565,397,457,835,898,971,938,744],function(){return e(e.s=8373)}),_N_E=e.O()}]);